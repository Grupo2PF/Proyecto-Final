// Import the functions you need from the SDKs you need
import app from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU8aFxkr8Mhe4Ak-pIny6CMpStyGNqVNs",
    authDomain: "proyecto-final-c5855.firebaseapp.com",
    databaseURL: "https://proyecto-final-c5855-default-rtdb.firebaseio.com",
    projectId: "proyecto-final-c5855",
    storageBucket: "proyecto-final-c5855.appspot.com",
    messagingSenderId: "400989597935",
    appId: "1:400989597935:web:deb80e5bb43aca6f32eb1a"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();


export { db, auth };