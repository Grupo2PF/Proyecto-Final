const express = require("express");
const axios = require("axios");
const { Duffel } = require("@duffel/api");
const router = express();

const duffel = new Duffel({
  // Store your access token in an environment variable, keep it secret and only readable on your server
  token: "duffel_test_5oKRr362CbQ5GAv-enslSuMIgYqXC9nrvaFBVSFbYEi",
});

router.get("/", async function (req, res) {
  // const flightApi = await axios.get();
  /*const aircraft = await duffel.aircraft.get("arc_00009VMF8AhXSSRnQDI6Hi");
  console.log(aircraft);*/

  const offerRequestResponse = await duffel.offerRequests.create({
    slices: [
      {
        origin: "NYC",
        destination: "ATL",
        departure_date: "2021-12-21",
      },
    ],
    passengers: [{ type: "adult" }],
    cabin_class: "economy",
    return_offers: false,
  });

  console.log(offerRequestResponse.data.slices[0].origin);

  return res.send("Hello World from Home!");
});

router.get("/results", async function (req, res) {
  // const flightApi = await axios.get();
  const aircraft = await duffel.aircraft.get("arc_00009VMF8AhXSSRnQDI6Hi");
  console.log(aircraft);
  return res.send("Hello World from results!");
});

module.exports = router;
