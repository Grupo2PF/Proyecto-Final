const express = require("express");
const duffel = require('../duffel');
const IATA = require('../../../IATA.json');

const router = express();

router.get('/isavailable', async(req, res, next)=>{

    const {
        flightId,
        mode,
        originAirport,
        destinationAirport,
        price,
        adults,
        childs,
        baby,
        cabin,
        dDate,
        transfers
    } = req.query;

    const escalas = transfers.length;
    const psgrs = [];

    for(let i = 0; i < adults; i++){
        let psgr = {type: "adult"};
        psgrs.push(psgr);
      }
  
      if(childs > 0){
        for(let k = 0; k < childs; k++){
          let psgr = {type: "child"};
          psgrs.push(psgr);
        }
      }
  
      if(baby > 0){
        for(let k = 0; k < baby; k++){
          let psgr = {type: "infant_without_seat"};
          psgrs.push(psgr);
        }
    }


    try{
        const flight = await duffel.offers.get(flightId, {
            "return_available_services": true
        });
    
        const data = flight.data;
    
        const info = {
            mode: mode,
            airline: data.owner.name,
            currency: data.total_currency,
            price: data.total_amount,
            class: data.slices[0].segments[0].passengers[0].cabin_class,
            passengers: psgrs,
            origin: {
                city: data.slices[0].origin.city_name,
                airport: data.slices[0].origin.name,
                date: data.slices[0].segments[0].departing_at
            },
            destination: {
                city: data.slices[0].destination.city_name,
                airport: data.slices[0].destination.name,
                date: data.slices[0].segments[0].arriving_at
            },
            transfers: [],
    
        }
    
        data.slices[0].segments.map((transfer)=>{
            let tr = {
              id: transfer.id,
              origin: transfer.origin.city_name,
              destination: transfer.destination.city_name,
              departure: transfer.departing_at,
              arrive: transfer.arriving_at,
              airline: transfer.marketing_carrier.name,
              flightNumber: transfer.marketing_carrier_flight_number
            }
    
            info.transfers.push(tr);
            
          });
    
        return res.send(info);

    }catch{

        try{

            let originIATA, destinationIATA;

            for(let i = 0; i < IATA.length; i++){
                if(IATA[i].airport === originAirport){
                    originIATA = IATA[i].iata;
                }
                if(IATA[i].airport === destinationAirport){
                    destinationIATA = IATA[i].iata;
                }
            }

            console.log(originIATA, destinationIATA);

            const offerRequestOneway = await duffel.offerRequests.create(
                {
                  return_offers: true,
                  slices: [
                    {
                      origin: originIATA,
                      destination: destinationIATA,
                      departure_date: dDate,
                    },
                  ],
                  passengers: psgrs,
                  cabin_class: cabin,
                }
            );

            for(let i = 0; i < offerRequestOneway.data.offers.length; i++){
                
                let transfers = [];

          
                offerRequestOneway.data.offers[i].slices[0].segments.map((transfer)=>{
                    let tr = {
                        origin: transfer.origin.city_name,
                        destination: transfer.destination.city_name,
                        departure: transfer.departing_at,
                        arrive: transfer.arriving_at,
                        airline: transfer.marketing_carrier.name,
                        flightNumber: transfer.marketing_carrier_flight_number
                    }
          
                  transfers.push(tr);
                });
                
                if(offerRequestOneway.data.offers[i].slices[0].origin.iata_code === originIATA && offerRequestOneway.data.offers[i].slices[0].destination.iata_code === destinationIATA){
                    console.log(offerRequestOneway.data.offers[i].total_amount, price);
                    if(offerRequestOneway.data.offers[i].total_amount === price){
                        console.log("los precios son iguales");
                        console.log(escalas, transfers.length)
                      if(escalas === transfers.length){
                          let response = {
                            flightId: offerRequestOneway.data.offers[i].id,
                            mode: mode,
                            currency: offerRequestOneway.data.offers[i].total_currency,
                            price: offerRequestOneway.data.offers[i].total_amount,
                            dDate: dDate,
                            cabin: cabin,
                            passengers: {
                                adults: adults,
                                childs: childs,
                                baby: baby
                            },
                            origin: {
                                city: offerRequestOneway.data.offers[i].slices[0].origin.city_name,
                                airport: offerRequestOneway.data.offers[i].slices[0].origin.name,
                                date: offerRequestOneway.data.offers[i].slices[0].segments[0].departing_at,
                            },
                            destination: {
                                city: offerRequestOneway.data.offers[i].slices[0].destination.city_name,
                                airport: offerRequestOneway.data.offers[i].slices[0].destination.name,
                                date: offerRequestOneway.data.offers[i].slices[0].segments[0].arriving_at
                            },
                            transfers: transfers
                          }

                          if(response.origin.city === response.origin.airport){
                            let i = 0;
                            while(response.origin.city === response.origin.airport){
                              if(response.data.offers[i].slices[0].origin.iata_code === origin){
                                response.origin.airport = offerRequestOneway.data.offers[i].slices[0].origin.name;
                              }
                              i++;
                            }
                          }


                          if(response.destination.city === response.destination.airport){
                            let i = 0;
                            while(response.destination.city === response.destination.airport){
                              if(response.data.offers[i].slices[0].destination.iata_code === destination){
                                response.destination.airport = offerRequestOneway.data.offers[i].slices[0].destination.name;
                              }
                              i++;
                            }
                          }

                          return res.send(response);

                        }

                    }
                }
            }

            return res.send("El vuelo no está disponible");

        }catch{
            const error = {
                message: "El vuelo solicitado no está disponible"
            }
    
            next(error);
        }
    }


});

module.exports = router;