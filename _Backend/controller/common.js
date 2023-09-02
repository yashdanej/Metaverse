const jwt = require('jsonwebtoken');
exports.getUser = async (req) => {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    return userId;
}