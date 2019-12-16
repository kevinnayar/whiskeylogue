const dotenv = require('dotenv');
const admin = require('firebase-admin');
const whiskyData = require('./old-whiskies.json');
const serviceAccount = require('/Users/q1027583/Desktop/keys/whiskeylogue-firebase-adminsdk-ebw5v-43a1ee5827.json');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();

function massUploadWhisky(db, oldWhisky, newAverageRating) {
  const ref = db.collection('whiskies').doc();
  const id = ref.id;
  const newWhisky = {
    brand: oldWhisky.brand,
    name: oldWhisky.name,
    type: oldWhisky.type,
    age: oldWhisky.age,
    price: oldWhisky.price,
    origin: oldWhisky.origin,
    createdAt: admin.firestore.Timestamp.now(),
    averageRating: parseFloat(newAverageRating.toFixed(2)),
    whiskyId: id,
    // imageUrl?: string;
  };

  db
    .collection('whiskies')
    .doc(id)
    .set(newWhisky)
    .then(() => {
      console.log(`Uploaded item: ${oldWhisky.brand} ${oldWhisky.name}`);
    })
    .catch(error => {
      console.log(`Could not upload item: ${oldWhisky.brand} ${oldWhisky.name}.\nError: ${error}`);
    });
}

function average(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

whiskyData.forEach((oldWhisky) => {
  const newAverageRating = average(oldWhisky.ratings.map(r => r.score));
  massUploadWhisky(db, oldWhisky, newAverageRating);
});
