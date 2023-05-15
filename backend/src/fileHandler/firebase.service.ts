import * as admin from "firebase-admin"

const serviceAccount = require('../../firebase-admin-sdk.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://jobsite-385401.appspot.com",
});

export const firebaseApp = admin.app();
export const storageBucket = firebaseApp.storage().bucket();