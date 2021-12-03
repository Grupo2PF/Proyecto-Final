const admin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountGoogle.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyecto-final-c5855-default-rtdb.firebaseio.com"
});

export default admin;
