const {Router} = require('express');


// Importar todos los routers
const users = require('./users.js');
const flights = require('./flights.js');



const router = Router();

// Configurar los routers

router.use('/', users);
router.use('/', flights);

module.exports = router;