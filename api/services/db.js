// const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')



// async function main(queryFunc){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */
//
//   const client = new MongoClient(url);
//
//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();
//     return await queryFunc(client)
//   } catch (e) {
//     console.error(e);
//   }
// }

module.exports = async function (){
  const url = 'mongodb+srv://admin_user_test:13052205Denis@clustertest.4q38e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  await mongoose.connect(url, {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}
  // err => {
  //   console.info('*    Database: MongoDB'); // eslint-disable-line
  //   console.info( // eslint-disable-line
  //     err
  //       ? *    Error connecting to DB: ${err}\n****************************
  // : '*    DB Connection: OK\n****************************',
  // );

// })

