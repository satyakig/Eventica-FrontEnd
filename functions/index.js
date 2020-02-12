const functions = require('firebase-functions');
const { v1 } = require('@google-cloud/firestore');

const client = new v1.FirestoreAdminClient();

const bucket = 'gs://seng-513.appspot.com/backups';

exports.databaseBackup = functions.pubsub.schedule('every 24 hours').onRun((context) => {
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
  const databaseName = client.databasePath(projectId, '(default)');

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      collectionIds: [],
    })
    .then((responses) => {
      const response = responses[0];
      console.log(`Operation Name: ${response['name']}`);
      return response;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Export operation failed');
    });
});
