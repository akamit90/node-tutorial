 const jwt = require('jsonwebtoken');

 const jwtAuthMiddleware = (req, res, next) => {

    // first check request header has authorization or not 
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token not found '});

    // extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        // verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:30000});

        // attach user info. to the request object 
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'invalid token'});
    }
 }

 //Function to generate Jwt Token
const generateToken=(userData)=>{
    // Generate a new JWT token using user data 
    return jwt.sign(userData,process.env.JWT_SECRET)
}

 module.exports = {jwtAuthMiddleware,generateToken};