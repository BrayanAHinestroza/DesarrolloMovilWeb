const admin = require("firebase-admin");
const serviceAccount = require("./app-sgc-firebase-adminsdk-zfdqp-52764a092b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;