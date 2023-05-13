
const Like = require("../models/like");



exports.GetAllUserLikes = (req, res, next) => {



    const userLiked = req.userData.userId;

    Like.find({ userLiked }).then(result => {
        console.log("in the Get Likes Func n > 0 true");

        // if (result.n > 0) {
        res.status(200).json({
            message: "Likes :)",
            result
        });
        // } else {
        //     res.status(204).json({
        //         message: "No likes.",
        //         result
        //     });
        // }


    }).catch(error => {
        res.status(500).json({
            message: "Couldn't like the post!"
        });
    });

}

exports.likePost = (req, res, next) => {




    //  console.log(req);

    console.log("myTestMiddleware ........")



    // bcrypt.hash(req.body.password, 10).then(hash => {
    //     const user = new User({
    //         email: req.body.email,
    //         password: hash
    //     });
    //     user
    //         .save()
    //         .then(result => {
    //             res.status(201).json({
    //                 message: "User created!",
    //                 result: result
    //             });
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 message: "Invalid authentication credentials!"
    //             });
    //         });
    // });
}