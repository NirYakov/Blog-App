
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

    const isLike = req.body.isLike;
    const postId = req.params.id;

    console.log(`>>>>  ${isLike}   ${req.userData.userId}`);

    const randZeroToN = (n) => { return Math.floor(Math.random() * (n + 1)); };

    const num = randZeroToN(1_000);

    const like = new Like({
        userLiked: req.userData.userId,
        postId: postId,
    });

    // userLoggedIn

    // {$inc : {'post.likes' : 1}
    // {$inc : {'post.likes' : 1}}
    // Post.updateOne({ _id: postId }, { $inc: { likes: 1 } })
    Post.updateOne({ _id: postId }, { likes: num })
        .then(result => {
            if (result.n > 0) {
                // res.status(200).json({ message: "Update successful!", likes: num });

                like.save().then(createdLiked => {
                    res.status(201).json({
                        message: "Like added successfully",
                        createdLiked,
                        likes: num,
                        isLike

                    });
                }).catch(error => {
                    res.status(500).json({ message: "Creating a post failed!" });
                });

            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't like the post!"
            });
        });

    // req.userData.userId


    // res.status(200).json({ like: "LIKE :)", isLike });
}

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    }).catch(error => {
        res.status(500).json({ message: "Fetcing post failed!" });
    });
}