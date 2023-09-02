const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                const userId = decoded.id;
                console.log('userId: ', userId);
            });
        }else{
            res.status(401).json({'message': 'Unauorized user'});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({'message': 'Unauorized user'});
    }
}

module.exports = auth;