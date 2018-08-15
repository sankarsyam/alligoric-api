const userService= require('./users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSerializer = require('../serializers/user');

const authenticateUser = async credentials => {
    const user = await userService.findUserByEmail(credentials.email);
    const valid = user
      ? await bcrypt.compare(credentials.password, user.passwordDigest)
      : false;
  
    if (valid) {
      const serializedUser = await userSerializer(user);
      const token = jwt.sign({ currentUserId: user.id }, process.env.JWT_SECRET);
      return { jwt: token, user: serializedUser };
    }
    throw Error('Email or Password is incorrect');
  };

module.exports = {
 authenticateUser,
}