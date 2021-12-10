const express = require("express");
const duffel = require('../duffel');

const router = express();

router.get('/isavailable', async(req, res, next)=>{

    const { id } = req.body;

    try{
        const flight = await duffel.offers.get(id, {
            "return_available_services": true
        });
    
        const data = flight.data;
    
        var mode = "";
    
        if(data.slices.length > 1){
            mode = "roundtrip"
        }else{
            mode = "oneway"
        }
    
        const info = {
            mode: mode,
            class: data.slices[0].segments[0].passengers[0].cabin_class,
            origin: {
                city: data.slices[0].origin.city_name,
                airport: data.slices[0].origin.name,
            },
            destination: {
                city: data.slices[0].destination.city_name,
                airport: data.slices[0].destination.name,
            },
            price: data.total_amount,
            currency: data.total_currency,
            airline: data.owner.name,
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
    
        res.send(info);
    }catch{
        const error = {
            message: "El vuelo solicitado no está disponible"
        }

        next(error);
    }


});

module.exports = router;