const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const wholeToken = req.headers.authorization;
        console.log(wholeToken)
        if (wholeToken) {
            const token = wholeToken.split(" ")[1]
            jwt.verify(token, 'avenger',  function(err, decoded) {
                // console.log(decoded)
                if(decoded) {
                    next()
                } else if (err) {
                    res.status(200).json({"err": err.message})
                }
              });
              

        } else {
            res.status(200).json({"msg": "please provide valid token"})
        }
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
}



module.exports = {auth}