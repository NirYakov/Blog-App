
const Post = require("../models/post");
const Like = require("../models/like");


exports.createPost = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId,
        likes: 0
    });

    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully",
            post: {
                ...createdPost,
                id: createdPost._id
            }
        });
    }).catch(error => {
        res.status(500).json({ message: "Creating a post failed!" });
    });
}


exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: fetchedPosts,
                maxPosts: count
            });
        }).catch(error => {
            res.status(500).json({ message: "Fetching posts faild!" });
        });;
}


exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update post!"
            });
        });
};


exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Deletion successful!" });
        }
        else {
            res.status(401).json({ message: "Not Authorized!" });
        }
    }).catch(error => {
        res.status(500).json({ message: "Fetcing post failed!" });
    });;
}

// PostLike

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


exports.postLike = (req, res, next) => {

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