const {Router} = require('express');


// Importar todos los routers
const users = require('./users.js');
const flights = require('./flights.js');
const seats = require('./seats.js');



const router = Router();

// Configurar los routers

router.use('/', users);
router.use('/', flights);
router.use('/', seats);

module.exports = router;