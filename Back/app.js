const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

const fs = require("fs");


function connectToMyMongo() {
    //////// read the username and the password from my file.

    fs.readFile("./../../MyMongoDb.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            const userDB = JSON.parse(jsonString);
            console.log("userDB username is:", userDB.username);
            console.log("userDB password is:", userDB.password);

            const uri = `mongodb+srv://Nir:${userDB.password}@cluster0.tcpdrjy.mongodb.net/Testt?retryWrites=true&w=majority`;

            // console.log("uri :", uri);

            // Prints "MongoError: bad auth Authentication failed."

            mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            }).then(() => {
                console.log('Connected to database');
            }).catch(err => { console.log(err.reason); console.log("Connection failed!"); });


            // End :  mongoDb connect

        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });

    ///////
}

////// invoke connection to mongoDB
connectToMyMongo();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});



app.use("/api/posts", postsRoutes);

module.exports = app;
