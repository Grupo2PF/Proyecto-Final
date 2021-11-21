const { Router } = require("express");
const axios = require("axios");
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://" //puedo usar variable de entorno aca
    });
const db = admin.database();


const router = Router();

//aca abajo van las rutas, o en su defecto habrá que modularizar


module.exports = router;
