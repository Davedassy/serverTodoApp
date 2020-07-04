const express = require("express");
const mongoose = require("mongoose");
const todoRoute = require("./router/api/todo");
const userRoute = require("./router/api/user")
require('dotenv/config');

// initilizing express
const app = express();

// meddlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/todo/api/v1", todoRoute);
app.use("/",userRoute)


// database connection
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser:true,useUnifiedTopology:true}
    )
       .then( () => {
           console.log("connected to db")
       })
       .catch(err => {
           console.log(err)
       })

module.exports = app