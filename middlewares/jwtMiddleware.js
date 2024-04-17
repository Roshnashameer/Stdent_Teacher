const jwt = require('jsonwebtoken')

exports.jwtMiddleware = (req, res, next) => {



    // verify
    try {
        const header = req.headers["authorization"];
        if (!header) {
            throw new Error("Authorization header missing");
        }

        const token = header.split(" ")[1];
        // console.log(token);
        const JWTresponse = jwt.verify(token, 'supersecretkey123');
        console.log(JWTresponse);
        req.payload = JWTresponse._id;

        next();

    }
    catch {
        res.status(401).json("autherization failed ! pls login")

    }
}
exports.jwtRoleMiddleware = (req, res, next) => {

    // verify
    try {
        const header = req.headers["authorization"];
        if (!header) {
             throw new Error("Header missing") ;
        }

        const token = header.split(" ")[1];
        // console.log(token);
        const JWTresponse = jwt.verify(token, 'supersecretkey123');
        // console.log(JWTresponse);
        const  role= JWTresponse.role;
        if(role ==="student"){
           return res.status(401).json("Not allowed")
        }

        next();

    }
    catch(abc) {
        res.status(401).json(abc.message)

    }
    
}