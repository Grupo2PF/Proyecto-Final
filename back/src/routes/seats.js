const express = require("express");
const axios = require("axios");
const duffel = require('../duffel');

const router = express();

router.get('/:id/seats', async (req, res, next)=>{

    try{

        const { id } = req.params;

        const flightSeats = await duffel.seatMaps.get({
          offer_id: id,
        });

        if(flightSeats.data.length > 0){
          //SI DEJA ELEGIR ASIENTOS, LOS MAPEAMOS

          const offers = [];

          flightSeats.data.map((fs)=>{

            const flight = {
              halls: fs.cabins[0].aisles,
              columns: (fs.cabins[0].aisles) + 1,
              rows: fs.cabins[0].rows.length,
              seats: []
            }

            for(let i = 0; i < flight.rows; i++){
              const row = [];

              for(let j = 0; j < fs.cabins[0].rows[i].sections.length; j++){
                const section = [];

                for(let k = 0; k < fs.cabins[0].rows[i].sections[j].elements.length; k++){
                  
                  const column = {
                    type: fs.cabins[0].rows[i].sections[j].elements[k].type,
                    number: fs.cabins[0].rows[i].sections[j].elements[k].designator,
                    disclosures: fs.cabins[0].rows[i].sections[j].elements[k].disclosures,
                    available: true
                  }

                  if(fs.cabins[0].rows[i].sections[j].elements[k].available_services){
                    column.available = false;
                  }else{
                    column.available = true;
                  }

                  section.push(column);

                }

                row.push(section);

              }

              flight.seats.push(row);

            }

            offers.push(flight);

          });

          return res.send(offers);

        }else{
          return res.send("No hay asientos disponibles");
        }

    }catch(error){

      next(error);

    }

});


module.exports = router;