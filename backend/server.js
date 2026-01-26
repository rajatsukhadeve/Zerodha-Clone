require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const app = express();

const URL = process.env.MONGO_URL;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(URL);
    console.log("connected to db");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(PORT,()=>{
    console.log("app is running on 8080");
})