const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/technomagaz";

app.use(express.json());

async function dev() {
  try {
    await mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB connect"))
      .catch((err) => console.log(err));

    app.listen(PORT, () => console.log("Server is running!"));
  } catch (error) {
    console.log(error);
  }
}

dev();
