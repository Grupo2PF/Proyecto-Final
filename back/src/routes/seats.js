const express = require("express");
const axios = require("axios");
const duffel = require('../duffel');

const router = express();

<<<<<<< HEAD
router.get('/:id/seats', async (req, res, next)=>{
=======
router.get('/seats/:id', async (req, res, next)=>{
>>>>>>> 293bebb88cbdeb3144347f8f0ad08f110b650840

    try{

        const { id } = req.params;

        const flightSeats = await duffel.seatMaps.get({
          offer_id: id,
        });

<<<<<<< HEAD
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
=======

        if(flightSeats.data.length > 0){
          //SI DEJA ELEGIR ASIENTOS, LOS MAPEAMOS

          const offers = {
            seatsByFlight: flightSeats.data.map((e) => {
              const offerSlice = {
                id: e.id,
                hallsAmount: e.cabins.map((e) => e.aisles),
                rowsAmount: e.cabins.map((e) => e.rows.length),
                columns: e.cabins.map((e) => e.rows.map((e) => e.sections.length)),
                seatsByColumn: e.cabins.map((e) =>
                  e.rows.map((e) => e.sections.map((e) => e.elements.length))
                ),
                //map: e.cabins.rows.map((e) => e),
                seatsInfo: e.cabins.map((e) =>
                  e.rows.map((e) =>
                    e.sections.map((e) =>
                      e.elements.map((e) => {
                        const boxInfo = {
                          type: e.type,
                          numberAndLetter: e.designator,
                          available: e.available_services,
                          restrictions: e.disclosures,
                        };
                        return boxInfo;
                      })
                    )
                  )
                ),
              };
              return offerSlice;
            }),
          };
        
          return res.send(offers);
        } else {
>>>>>>> 293bebb88cbdeb3144347f8f0ad08f110b650840
          return res.send("No hay asientos disponibles");
        }

    }catch(error){

      next(error);

    }

});


module.exports = router;