const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = async (req, res, next) => {
    const userLooked = await User.findOne({ email: req.body.email });

    if (userLooked) {
        console.log("User in the database");

        return res.status(500).json({
            message: "Invalid authentication credentials! User in the database."
        });
    }

    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!"
                });
            });
    });
}


exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({
                    message: "Invalid authentication credentials!"
                });
                return false;
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                if (!res.statusCode)
                    res.status(401).json({
                        message: "Auth failed"
                    });
                return res;
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        }).catch(error => console.log(" Error Occured!"));
}