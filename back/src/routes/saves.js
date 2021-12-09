const express = require('express');
const admin = require('../firebase');
const db = admin.firestore();

const router = express();

router.post('/saveflight', async(req, res, next)=>{

    const { id, origin, destination, originAirport, destinationAirport, escalas, price, userId } = req.body;
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
            flightId: id,
            userId: userId,
            origin: origin,
            destination: destination,
            originAirport: originAirport,
            destinationAirport: destinationAirport,
            transfers: escalas,
            price: price
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
                    flightId: doc.data().flightId,
                    userId: doc.data().userId,
                    origin: doc.data().origin,
                    destination: doc.data().destination,
                    originAirport: doc.data().originAirport,
                    destinationAirport: doc.data().destinationAirport,
                    transfers: doc.data().transfers,
                    price: doc.data().price
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