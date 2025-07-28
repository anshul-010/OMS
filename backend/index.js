require("dotenv").config();
const mongoURL = process.env.mongoURL;
const productRoute = require("./routes/ProductRoute");
const { userRoute } = require("./routes/UserRoute");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Other Routes
app.use('/api', productRoute);
app.use('/api', userRoute);


// Home Route
app.get("/", async (req, res) => {
  try {
    res.send({msg:"hello from lanovo"})
  } catch (error) {
  }
});

// Connection
app.listen(8080, async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log(`Connection Successfull, Server running on Port: 8080.`);
  } catch (error) {
    console.log("Connection Error:-", error);
  }
});
