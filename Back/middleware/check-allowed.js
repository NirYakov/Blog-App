
const middleWareCheckAllowed = (req, res, next) => {
    try {
        if ((req.headers.authorization)) {
            next();
        } else {
            res.status(401).json({ message: "You Are Not register user" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "You Are Not authenticated!" });
    };

}

module.exports = middleWareCheckAllowed;