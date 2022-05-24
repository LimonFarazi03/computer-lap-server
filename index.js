const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const collectionDatabase = client.db("person").collection("user");
    // get and read all api
    app.get("/services", async(req, res) => {
      const query = req.body;
      const cursor = collectionDatabase.find(query);
      const service = await cursor.toArray();
      res.send(service)
    });
    // Create api
    app.post('/service', async(req,res)=>{
      
    })
    // UPDATE api
    // DELETE API
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
