require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const{HoldingsModel} = require('./models/HoldingsModel');
const {PositionsModel} = require('./models/PositionsModel');
const {OrdersModel} = require('./models/OrdersModel');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const URL = process.env.MONGO_URL;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(URL);
  console.log("connected to db");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get("/" ,(req,res)=>{
  res.send("Hellow")
});

app.get('/allHoldings' ,async(req,res)=>{
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get('/allPositions' ,async(req,res)=>{
  let allPostitions = await PositionsModel.find({});
  res.json(allPostitions);
});

app.post("/newOrder",async(req,res)=>{
  const order = new OrdersModel({...req.body}); 

  await order.save();
  res.send("order saved");
  console.log("order saved");
})

app.listen(PORT, () => {
  console.log("app is running on 8080");
})