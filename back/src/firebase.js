const admin = require("firebase-admin");
const firebase = require('firebase-admin');

const serviceAccount = require("./serviceAccountGoogle.json");

const firebaseConfig = {
  apiKey: "AIzaSyBU8aFxkr8Mhe4Ak-pIny6CMpStyGNqVNs",
  authDomain: "proyecto-final-c5855.firebaseapp.com",
  databaseURL: "https://proyecto-final-c5855-default-rtdb.firebaseio.com",
  projectId: "proyecto-final-c5855",
  storageBucket: "proyecto-final-c5855.appspot.com",
  messagingSenderId: "400989597935",
  appId: "1:400989597935:web:4402630d1acedaa232eb1a",
  credential: admin.credential.cert(serviceAccount),
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;