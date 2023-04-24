const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");

const app = express();


const connectToMyMongo = require("./MongoConnection");


////// invoke connection to mongoDB
connectToMyMongo();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));


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
