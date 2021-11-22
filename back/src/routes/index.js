const { Router } = require("express");
const axios = require("axios");
const app = require('firebase');

app.initializeApp({
    credential: app.credential.applicationDefault(),
    databaseURL: "https://" //puedo usar variable de entorno aca
    });

const db = app.database();


const router = Router();

//aca abajo van las rutas, o en su defecto habrá que modularizar


module.exports = router;
