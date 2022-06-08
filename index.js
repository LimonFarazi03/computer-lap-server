const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ylpsb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const collectionDatabase = client.db("items").collection("item");
    // get and read all api
    app.get("/items", async (req, res) => {
      const query = req.body;
      const cursor = collectionDatabase.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // get and read single api
    app.get("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await collectionDatabase.findOne(query);
      res.send(result);
    });
    // Create api
    app.post("/item", async (req, res) => {
      const query = req.body;
      const result = await collectionDatabase.insertOne(query);
      res.send(result);
    });
    // UPDATE api

    // DELETE API
    app.delete("/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await collectionDatabase.deleteOne(filter);

      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.", id);
      } else {
        console.log("No documents matched the query. Deleted 0 documents.", id);
      }
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
