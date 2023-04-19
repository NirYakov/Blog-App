const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

const fs = require("fs");


function connectToMyMongo() {
    //////// read the username and the password from my file.
    console.log("Myyy Data");

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

            //            mongoDb connect
            // mongoose.connect(`mongodb+srv://Nir:${userDB.password}@cluster0.tcpdrjy.mongodb.net/?retryWrites=true&w=majority`).then(() => {
            //     console.log('Connected to database!');
            // }).catch(() => {
            //     console.log("Connection failed!");
            // });


            console.log("uri :", uri);

            // Prints "MongoError: bad auth Authentication failed."

            mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            }).then(() => {
                console.log('Connected to database');
            }).catch(err => { console.log(err.reason); console.log("Connection failed!"); });


            // End :  mongoDb connect




            console.log("Success :)");

        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });

    ///////
}

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
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    console.log(post);

    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });

});

app.get("/api/posts", (req, res, next) => {
    const posts = [
        {
            id: "fadf12421l",
            title: "First server-side post",
            content: "This is coming from the server"
        },
        {
            id: "ksajflaj132",
            title: "Second server-side post",
            content: "This is coming from the server!"
        }
    ];
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts
    });
});

module.exports = app;
