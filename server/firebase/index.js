var admin = require("firebase-admin");
var serviceAccount = require("../key/chat-app-69863-firebase-adminsdk-bbz9a-4074333bab.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
