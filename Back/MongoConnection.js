const mongoose = require("mongoose");
const fs = require("fs");


const connectByReadJsonFile = () => {

    process.env.JWT_KEY = "secret_this_should_be_longer";

    fs.readFile("./../../MyMongoDb.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            const userDB = JSON.parse(jsonString);
            console.log("userDB username is:", userDB.username);
            console.log("userDB password is:", userDB.password);

            const uri = `mongodb+srv://Nir:${userDB.password}@cluster0.tcpdrjy.mongodb.net/Testt`;

            mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            }).then(() => {
                console.log('Connected to database');
            }).catch(err => { console.log(err.reason); console.log("Connection failed!"); });

        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
};


module.exports = function connectToMyMongo() {
    //////// read form api key env ? !

    if (process.env.MONGO_ATLAS_PW) {

        const uri = `mongodb+srv://Nir:${process.env.MONGO_ATLAS_PW}@cluster0.tcpdrjy.mongodb.net/Testt`;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }).then(() => {
            console.log('Connected to database');
        }).catch(err => {
            console.log(err.reason);
            console.log("Connection failed!");
            console.log("Try one more time");
            connectByReadJsonFile();
        });

    } else {

        ////// read the username and the password from my file.
        connectByReadJsonFile();


    }
}