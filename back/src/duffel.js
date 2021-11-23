const { Duffel } = require('@duffel/api');


const duffel = new Duffel({
    token: "duffel_test_5oKRr362CbQ5GAv-enslSuMIgYqXC9nrvaFBVSFbYEi",
})

console.log(duffel.token);
module.exports = duffel;