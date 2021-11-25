const express = require("express");
const axios = require("axios");
const { Duffel } = require("@duffel/api");
const router = express();
const codes = require("../../../IATA.json");

const duffel = new Duffel({
  // Store your access token in an environment variable, keep it secret and only readable on your server
  token: "duffel_test_5oKRr362CbQ5GAv-enslSuMIgYqXC9nrvaFBVSFbYEi",
});
/*
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const detail = await duffel.offerRequests.get(id);
  return res.send(detail);
});*/
/*
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
});*/

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
// TRANSFORMAR DE CITY A IATA
router.post("/Result", (req, res) => {
  const { city } = req.body;

  const result = codes.filter((e) =>
    e.city.toLowerCase().includes(city.toLowerCase())
  );

  console.log(result);

  return res.send(result);
});

router.get("/Seats", async (req, res) => {
  const flightSeats = await duffel.seatMaps.get({
    offer_id: "off_0000ADkUo9tvoAjNhxc66K",
  });
  console.log(flightSeats);
  return res.send(flightSeats.data);
});

router.get("/", async function (req, res) {
  const { inputOrigin } = req.query;
  const { inputDestiny } = req.query;
  const { inputDepartureDate } = req.query;
  const { inputReturnDate } = req.query;

  inputReturnDate
    ? (offerRequestResponse = await duffel.offerRequests.create({
        return_offers: true,
        slices: [
          {
            origin: inputOrigin,
            destination: inputDestiny,
            departure_date: inputDepartureDate,
          },
          {
            origin: inputDestiny,
            destination: inputOrigin,
            departure_date: inputReturnDate,
          },
          //otro objeto igual para la vuelta
        ],
        passengers: [{ type: "adult" }],
        cabin_class: "economy",
      }))
    : (offerRequestResponse = await duffel.offerRequests.create({
        return_offers: true,
        slices: [
          {
            origin: inputOrigin,
            destination: inputDestiny,
            departure_date: inputDepartureDate,
          },
          //otro objeto igual para la vuelta
        ],
        passengers: [{ type: "adult" }],
        cabin_class: "economy",
      }));

  const allTicketsInfo = {
    originCity: offerRequestResponse.data.slices[0].origin.city_name,
    originAirport: offerRequestResponse.data.slices[0].origin.name,
    destinyCity: offerRequestResponse.data.slices[0].destination.city_name,
    destinyAirport: offerRequestResponse.data.slices[0].destination.name,

    offersCurrencies: offerRequestResponse.data.offers.map(
      (offer) => offer.total_currency
    ),
    offersPrices: offerRequestResponse.data.offers.map(
      (offer) => offer.total_amount
    ),
    offersIds: offerRequestResponse.data.offers.map((offer) => offer.id),
    AirlineName: offerRequestResponse.data.offers.map(
      (offer) => offer.owner.name
    ),
    class: offerRequestResponse.data.offers.map(
      (e) => e.slices[0].fare_brand_name
    ),
    transfers: offerRequestResponse.data.offers.map((offer) =>
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
    ),
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
