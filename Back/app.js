const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const likesRoutes = require("./routes/likes");

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
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});


app.get("/api/health", (req, res, next) => { res.status(201).json({ health: "Online ! :)" }); })
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

app.use("/api/likes", likesRoutes);

module.exports = app;
