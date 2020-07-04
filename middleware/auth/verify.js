const jwt = require("jsonwebtoken");

module.exports = verifyToken = (req,res,next) => {
 
    try {
        const bearer = req.headers["authorization"]
        if(bearer){
            const bearerToken = bearer.split(" ")[1]
            jwt.verify({bearerToken},process.env.jwtscreet,(err,data) => {
                if(err){
                    return res.sendStatus(403)
                }else {
                    req.userData = data
                    next()
                }
            })
        }
   
        
    } catch (error) {
        res.sendStatus(403)
    }
}