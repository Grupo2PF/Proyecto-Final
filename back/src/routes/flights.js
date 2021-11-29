const express = require("express");
const axios = require("axios");
const duffel = require('../duffel');

const router = express();


router.get("/search", async function (req, res, next) {

  try{


    let mode;
    
    let { origin, destination, dDate, rDate, adults, childs, baby, cabin } = req.query;
    let psgrs = [];

    console.log(cabin);

    if(rDate !== undefined){
      mode = 'roundtrip';
    }else{
      mode = 'oneway';
    }

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
    
    if(mode === 'oneway'){
  
      const offerRequestOneway = await duffel.offerRequests.create(
        {
          return_offers: true,
          slices: [
            {
              origin: origin,
              destination: destination,
              departure_date: dDate,
            },
          ],
          passengers: psgrs,
          cabin_class: cabin,
        }
      );
  
      const flightResults = {
        mode: mode,
        class: cabin,
        origin: {
          city: offerRequestOneway.data.slices[0].origin.city_name,
          airport: offerRequestOneway.data.slices[0].origin.name
        },
        destination: {
          city: offerRequestOneway.data.slices[0].destination.city_name,
          airport: offerRequestOneway.data.slices[0].destination.name
        },
        offers: []
      };
      
      for(let i = 0; i < offerRequestOneway.data.offers.length; i++){
        let flight = {
          id: offerRequestOneway.data.offers[i].id,
          price: offerRequestOneway.data.offers[i].total_amount,
          currency: offerRequestOneway.data.offers[i].total_currency,
          airline: offerRequestOneway.data.offers[i].owner.name,
          transfers: [],
        }
  
        offerRequestOneway.data.offers[i].slices[0].segments.map((transfer)=>{
          let tr = {
            origin: transfer.origin.city_name,
            destination: transfer.destination.city_name,
            departure: transfer.departing_at,
            arrive: transfer.arriving_at,
            airline: transfer.marketing_carrier.name,
            flightNumber: transfer.marketing_carrier_flight_number
          }
  
          flight.transfers.push(tr);
  
        });
  
        flightResults.offers.push(flight);
      }

      res.send(flightResults);

    }
    
    else if(mode === 'roundtrip')
    
    {

      const offerRequestRoundtrip = await duffel.offerRequests.create(
        {
          return_offers: true,
          slices: [
            {
              origin: origin,
              destination: destination,
              departure_date: dDate,
            },
            {
              origin: destination,
              destination: origin,
              departure_date: rDate,
            },
          ],
          passengers: psgrs,
          cabin_class: cabin,
        }
      );

      //res.send(offerRequestRoundtrip);
  
      const flightResults = {
        mode: mode,
        class: cabin,
        origin: {
          city: offerRequestRoundtrip.data.slices[0].origin.city_name,
          airport: offerRequestRoundtrip.data.slices[0].origin.name
        },
        destination: {
          city: offerRequestRoundtrip.data.slices[0].destination.city_name,
          airport: offerRequestRoundtrip.data.slices[0].destination.name
        },
        offers: []
      };
      
      for(let i = 0; i < offerRequestRoundtrip.data.offers.length; i++){
        let flight = {
          id: offerRequestRoundtrip.data.offers[i].id,
          price: offerRequestRoundtrip.data.offers[i].total_amount,
          currency: offerRequestRoundtrip.data.offers[i].total_currency,
          airline: offerRequestRoundtrip.data.offers[i].owner.name,
          departure: {
            id: offerRequestRoundtrip.data.offers[i].slices[0].id,
            origin: {
              city: offerRequestRoundtrip.data.offers[i].slices[0].origin.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[0].origin.name,
              date: offerRequestRoundtrip.data.offers[i].slices[0].segments[0].departing_at
            },
            destiny: {
              city: offerRequestRoundtrip.data.offers[i].slices[0].destination.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[0].destination.name
            },
            transfers: []
          },
          return: {
            id: offerRequestRoundtrip.data.offers[i].slices[1].id,
            origin: {
              city: offerRequestRoundtrip.data.offers[i].slices[1].origin.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[1].origin.name,
              date: offerRequestRoundtrip.data.offers[i].slices[1].segments[0].departing_at
            },
            destiny: {
              city: offerRequestRoundtrip.data.offers[i].slices[1].destination.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[1].destination.name
            },
            transfers: []
          }
        }
  
        offerRequestRoundtrip.data.offers[i].slices[0].segments.map((transfer)=>{
          let tr = {
            origin: transfer.origin.city_name,
            destination: transfer.destination.city_name,
            departure: transfer.departing_at,
            arrive: transfer.arriving_at,
            airline: transfer.marketing_carrier.name,
            flightNumber: transfer.marketing_carrier_flight_number
          }

          flight.departure.transfers.push(tr);
          
        });

        offerRequestRoundtrip.data.offers[i].slices[1].segments.map((transfer)=>{
          let tr = {
            id: transfer.id,
            origin: transfer.origin.city_name,
            destination: transfer.destination.city_name,
            departure: transfer.departing_at,
            arrive: transfer.arriving_at,
            airline: transfer.marketing_carrier.name,
            flightNumber: transfer.marketing_carrier_flight_number
          }

          flight.return.transfers.push(tr);
          
        });
        
        flightResults.offers.push(flight);

      }

      console.log(flightResults.offers.length);

      res.send(flightResults);


    }

  }catch(error){

    if(error.errors){
      next(error.errors[0].message);
    }else{
      next(error);
    }

  }
});

module.exports = router;
