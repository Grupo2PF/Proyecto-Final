const express = require("express");
const axios = require("axios");
const duffel = require('../duffel');

const router = express();

router.get('/flight/:id/seats', async (req, res, next)=>{
    try{

        let id = req.params.id;

        const seats = await duffel.seatMaps.get({
            "offer_id": id
        });

        res.send(seats);

    }catch(error){
        if(error.errors){
            next(error.errors[0].message);
          }else{
            next(error);
        }
    }
});

module.exports = router;