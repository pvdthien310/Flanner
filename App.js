import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from 'expo-font';




export default function App() {
  const [loaded] = useFonts({
    capricaScript: require('./assets/fonts/CAPRICA_SCRIPT.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <LoginStack />
  );
}
// const MongoClient = require("mongodb").MongoClient;
// const mongoDbUri = 'mongodb + srv://flaner_db:ThucThienHuynhLinh123@cluster0.leaz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const client = new MongoClient(mongoDbUri);

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('sample_analytics');
//     const accounts = database.collection('accounts');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { account_id: 557378 };
//     const account = await accounts.findOne(query);
//     console.log(account);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


