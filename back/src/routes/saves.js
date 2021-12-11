const express = require('express');
const admin = require('../firebase');
const db = admin.firestore();

const router = express();

router.post('/saveflight', async(req, res, next)=>{

    const { offers, originCity, destinationCity, originAirport, destinationAirport, transfers, price, userId, adults, baby, childs, cabin, dDate, mode, currency } = req.body;
    var isSaved = false;

    console.log(userId);

    if(db.collection('saves')){

        const data = await db.collection('saves').get();
    
        data.forEach(doc => {
                if(id === doc.data().flightId){
                    isSaved = true;
                }   
            });

    }

    if(isSaved){
        const error = {
            message: "El vuelo ya está guardado"
        }

        next(error);

    }else{

        const save = {
            flightId: offers,
            userId: userId,
            mode: mode,
            currency: currency,
            price: price,
            dDate: dDate,
            cabin: cabin,
            passengers: {
                adults: adults,
                childs: childs,
                baby: baby
            },
            origin: {
                city: originCity,
                airport: originAirport
            },
            destination: {
                city: destinationCity,
                airport: destinationAirport
            },
            transfers: transfers
        }
    
        db.collection("saves").doc().set(save)
        .then(()=>{
            res.send("Add favourite complete!");
        })
        .catch((error)=>{
            next(error);
        })
    }

});



router.get('/getsaves', async(req, res, next)=>{
    try{

        const { userId } = req.body;

        const data = await db.collection('saves').get();
        const saves = [];

        data.forEach(doc => {

            if(userId === doc.data().userId){
                const save = {
                    flightId: doc.data().offers,
                    userId: doc.data().userId,
                    mode: doc.data().mode,
                    currency: doc.data().currency,
                    price: doc.data().price,
                    dDate: doc.data().dDate,
                    cabin: doc.data().cabin,
                    passengers: {
                        adults: doc.data().adults,
                        childs: doc.data().childs,
                        baby: doc.data().baby
                    },
                    origin: {
                        city: doc.data().originCity,
                        airport: doc.data().originAirport
                    },
                    destination: {
                        city: doc.data().destinationCity,
                        airport: doc.data().destinationAirport
                    },
                    transfers: doc.data().transfers
                }
                saves.push(save);
            }
            
        });

        res.send(saves);

    }catch(error){
        next(error);
    }
    
});


module.exports = router;