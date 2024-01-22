const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
//Initialize the app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Import Routes
const Contact = require("./routes/Contact");


app.use("/api", Contact);
//Connection From Mongoose to MongoDb

const  connectToDB = async() =>{
    try{
        
        await mongoose.connect('mongodb://127.0.0.1:27017/CRM',{useNewUrlParser: true,useUnifiedTopology: true});
        console.log("Connected to MongoDB");

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

connectToDB();

const port = 3000;
app.listen(port,()=>{
    console.log("Server started successfully");
});
