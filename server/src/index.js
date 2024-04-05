const express = require('express'); // framework to create our API
const cors = require('cors'); //allows u to set up the rules for comm. between frontend and backend
const mongoose = require('mongoose'); // arm of mongoDB

const { router } = require('./routes/users.js');

const app = express();

app.use(express.json())
app.use(cors());

app.use("/auth",router);

mongoose.connect("mongodb+srv://sushilAB:MERNproject123@recipes.fexkwzv.mongodb.net/recipes?retryWrites=true&w=majority");

app.listen(3001 , ()=>console.log("SERVER STARTED!"));