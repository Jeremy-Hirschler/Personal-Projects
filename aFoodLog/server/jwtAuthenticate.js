const jwt = require('jsonwebtoken');

module.exports = {

    authenticate:  async (req, res, next) => {
        let decodedjwt;
        try{
            console.log('hi)')
            console.log('cookies', req.cookies.userToken)
            decodedjwt = await jwt.verify(req.cookies.userToken, process.env.SECRET_KEY)
            console.log('decoded', decodedjwt)
            
            console.log('success', req.cookies.userToken)
            req.body.user_id = decodedjwt._id;//CHECK if user_id is correct
            next();
        }catch(err){
            console.log('Token error')
            
            res.status(400).json({errorMsg: 'You must be logged in'})
            return;
        }
    }
}

