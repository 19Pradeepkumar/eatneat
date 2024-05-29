// const mongoose = require("mongoose");
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI = "mongodb://localhost:27017/gofoodmern";
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// module.exports = function (callback) {
//   mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//     // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//     if (err) console.log("---" + err);
//     else {
//       // var database =
//       console.log("connected to mongo");
//       const foodCollection = await mongoose.connection.db.collection(
//         "food_items"
//       );
//       foodCollection.find({}).toArray(async function (err, data) {
//         const categoryCollection = await mongoose.connection.db.collection(
//           "foodCategory"
//         );
//         console.log(categoryCollection);
//         const cursor = categoryCollection.find({});
//         // Initialize an array to store the documents
//         const Catdata = [];

//         // Iterate over the cursor
//         cursor.forEach(
//           (doc) => {
//             // Push each document to the array
//             Catdata.push(doc);
//             console.log(doc);
//           },
//           async () => {
//             // Once all documents have been processed, use Catdata array as needed
//             callback(null, data, Catdata);
//           }
//         );
//       });
//     }
//   });
// };

const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/gofoodmern";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Example: Accessing a collection
    const fetched_data = await mongoose.connection.db.collection("food_items");
    // Do something with the collection...'
    const tempPromise = fetched_data.find({}).toArray();
    tempPromise
      .then(async (result) => {
        const fetched_data1 = await mongoose.connection.db.collection(
          "foodCategory"
        );
        //global.food_items = result;
        const tempPromise2 = fetched_data1.find({}).toArray();
        //console.log(fetched_data1);
        tempPromise2
          .then(async (res) => {
            global.food_items = result;
            global.foodCategory = res;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error("Error retrieving data:", err);
      });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;

// const mongoURI = "mongodb://localhost:27017/gofoodmern?";

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true });
//     console.log("Connected to MongoDB");
//     const fetched_data = mongoose.connect.db.collection("food_items");
//     console.log(fetched_data);
//     fetched_data.find({}).toArray(function (err, data) {
//       if (err) console.log(err);
//       else console.log(data);
//     });
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// };

// module.exports = mongoDB;

// .then(async () => {
//     console.log("Connected to MongoDB");
//     const fetched_data = await mongoose.connection.db.collection(
//       "food_items"
//     );
//     fetched_data.find({}).toArray(function (err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });
