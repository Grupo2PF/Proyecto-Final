const express = require("express");
const axios = require("axios");
const { Duffel } = require("@duffel/api");
const router = express();
const codes = require("../../../IATA.json");

const duffel = new Duffel({
  // Store your access token in an environment variable, keep it secret and only readable on your server
  token: "duffel_test_5oKRr362CbQ5GAv-enslSuMIgYqXC9nrvaFBVSFbYEi",
});

router.get("/SortResult", (req, res) => {
  const list = duffel.offers.list({
    after: "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
    before: null,
    limit: 4,
    offer_request_id: "orq_00009htyDGjIfajdNBZRlw",
    sort: "total_amount",
    max_connections: 5,
  });
  console.log(list);
  return res.send(list);
});

//codes.forEach((e) => console.log(e.iata))
/*
if(e)
*/
/*const addIataCode = function (input) {
  codes.forEach((e) => {
   console.log(e.iata);
  });
};
console.log(addIataCode);*/

router.post("/Result", (req, res) => {
  const { city } = req.body;

  const result = codes.filter((e) =>
    e.city.toLowerCase().includes(city.toLowerCase())
  );

  console.log(result);

  return res.send(result);
});

router.post("/", async function (req, res) {
  // const flightApi = await axios.get();
  /*const aircraft = await duffel.aircraft.get("arc_00009VMF8AhXSSRnQDI6Hi");
  console.log(aircraft);*/
  const { inputOrigin } = req.body;
  const { inputDestiny } = req.body;

  const offerRequestResponse = await duffel.offerRequests.create({
    return_offers: true,
    slices: [
      {
        origin: inputOrigin,
        destination: inputDestiny,
        departure_date: "2021-12-21",
      },
      //otro objeto igual para la vuelta
    ],
    passengers: [{ type: "adult" }],
    cabin_class: "economy",
  });

  const allTicketsInfo = {
    originCity: offerRequestResponse.data.slices[0].origin.city_name,
    originAirpot: offerRequestResponse.data.slices[0].origin.name,
    offersPrices: offerRequestResponse.data.offers.map(
      (offer) => offer.total_amount
    ),
    offersCurrencies: offerRequestResponse.data.offers.map(
      (offer) => offer.total_currency
    ),
    offersIds: offerRequestResponse.data.offers.map((offer) => offer.id),

    AirlineName: offerRequestResponse.data.offers.map(
      (offer) => offer.owner.name
    ),
    /*
var myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;
*/
    transfers: offerRequestResponse.data.offers.map(
      (offer) =>
        offer.slices[0].segments.map((e) => {
          const myTransfer = {
            origin: e.origin.city_name,
            destination: e.destination.city_name,
            departing: e.departing_at,
            arriving: e.arriving_at,
            airline: e.marketing_carrier.name,
            flightNumber: e.marketing_carrier_flight_number,
          };
          return myTransfer;
        })
      /* +
          "-" +
           +
          " " +
          e.departing_at +
          " " +
          e.arriving_at +
          " " +
          e.marketing_carrier.name +
          " " +
          e.marketing_carrier_flight_number
      )*/
    ),
    /* si if(segments.length > 1 ) { segments.map(seg => {
      origin: seg.origin.city_name,
      destiny:seg.destiny.city_name,
    }
    else return ("no hay escalas")
    })} */

    offers: offerRequestResponse.data.offers,

    destinyCity: offerRequestResponse.data.slices[0].destination.city_name,
    destinyAirpot: offerRequestResponse.data.slices[0].destination.name,
  };

  return res.send(allTicketsInfo);
});

/*  
origin and destiny
Airport name
Date and time
city name

offer currency
amount

id ticket
passenger 
name , lastname, dni , class

gate 
seat
flight number

*/

router.get("/results", async function (req, res) {
  // const flightApi = await axios.get();
  const aircraft = await duffel.aircraft.get("arc_00009VMF8AhXSSRnQDI6Hi");
  console.log(aircraft);
  return res.send("Hello World from results!");
});

module.exports = router;
