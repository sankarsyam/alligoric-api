const User = require('../models/user');

const findUserByEmail = async(email) =>{
    const user= await User.findBy({ email: email });
    return user;
}

module.exports = {
 findUserByEmail,
}