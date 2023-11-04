import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  function connect() {
    const client = new MongoClient(uri);
    const db = client.db("fruitHub");
    return { client, db };
  }

  myDB.getPhotos = async function (query = {}) {
    const { client, db } = connect();

    try {
      const photos = await db.collection("photos").find(query).toArray();

      return photos;
    } finally {
      await client.close();
    }
  };
  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
