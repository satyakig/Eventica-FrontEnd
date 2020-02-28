const functions = require('firebase-functions');
const { v1 } = require('@google-cloud/firestore');
const admin = require('firebase-admin');
const moment = require('moment');

admin.initializeApp();

const client = new v1.FirestoreAdminClient();
const firestore = admin.firestore();

const BACKUP_BUCKET = 'gs://seng-513.appspot.com/backups';
const PROJECT_ID = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

exports.databaseBackup = functions.pubsub.schedule('every 24 hours').onRun((context) => {
  const databaseName = client.databasePath(PROJECT_ID, '(default)');
  const today = moment().format('DD-MM-YYYY');

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: `${BACKUP_BUCKET}/${today}`,
      collectionIds: [],
    })
    .then((responses) => {
      const response = responses[0];
      console.debug(`Operation Name: ${response['name']}`);
      return response;
    });
});

exports.addUser = functions.auth.user().onCreate((user) => {
  const defaultPicture =
    'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

  const id = user.uid;
  const name = user.displayName;
  const userPhoto = user.photoURL ? user.photoURL : defaultPicture;
  const email = user.email;
  const phone = user.phoneNumber;

  return firestore
    .collection('users')
    .doc(id)
    .set({
      uid: id,
      name: name,
      photoURL: userPhoto,
      email: email,
      phone: phone,
    });
});
