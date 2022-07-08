const jwt = require('jsonwebtoken');

 const generateToken = (user) => {
    return jwt.sign({
        data: user
    }, 'KEy', {expiresIn: '356d'});
};

module.exports = { generateToken }