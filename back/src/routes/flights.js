const express  = require("express");
const axios = require("axios");

const router = express();


router.get('/api', async function (req, res) {
    // const flightApi = await axios.get();
    return res.send ('Hello World from API!');

})


module.exports = router;