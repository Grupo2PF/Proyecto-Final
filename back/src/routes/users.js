const express  = require("express");
const axios = require("axios");

const router = express();


router.get('/users', async function (req, res) {
    // const flightApi = await axios.get();
    return res.send ('Hello World From Users!');

});

module.exports = router;