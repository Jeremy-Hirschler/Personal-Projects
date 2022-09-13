const jwt = require('jsonwebtoken');

module.exports = {

    authenticate:  async (req, res, next) => {
        let decodedjwt;
        try{
            decodedjwt = await jwt.verify(req.cookies.userToken, process.env.SECRET_KEY)
            //CHECK if user_id is correct
            req.body.user_id = decodedjwt._id;
            next();
        }catch(err){
            console.log('Token error')
            res.status(400).json({errorMsg: 'You must be logged in'})
            return;
        }
    }
}

