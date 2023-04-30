admin = require('firebase-admin');
serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'coco-intranet.appspot.com'
});

module.exports = admin;