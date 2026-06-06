const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    console.log("AUTH HEADER =>", req.headers.authorization);
    console.log("JWT SECRET =>", process.env.JWT_SECRET);

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN =>", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED =>", decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("JWT ERROR =>", err.message);

        return res.status(401).json({
            message: err.message
        });

    }
};

module.exports = verifyToken;