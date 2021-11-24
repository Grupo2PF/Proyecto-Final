const express  = require("express");
const axios = require("axios");
const iataJson = require('../../../IATA.json');
const duffel = require('../duffel');

const router = express();

function getIATA(cityName){
    const objdelacity = iataJson.filter(o => o.city.includes(cityName))
    return objdelacity;
}


router.get('/api', async function (req, res) {

    let iata = getIATA("Miami");

    let offer = duffel.offerRequests.create({
        "return_offers": true,
        "slices": [
          {
            "origin": "JFK",
            "destination": iata,
            "departure_date": "2021-12-24"
          }
        ],
        "passengers": [
          {
            "type": "adult"
          }
        ],
        "cabin_class": "economy"
      })
      .then((response)=>{
        duffel.seatMaps.get({
          "offer_id": "off_0000ADk0iJFdJj6lE5N85V"
        })
        .then((response)=>{
          res.send(response);
        })
      })
      .catch((error)=>{
          res.send(error);
      })

})


module.exports = router;