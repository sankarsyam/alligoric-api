if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require
}

const clearDB = require('../lib/clearDB');

const User = require('../models/user');

clearDB().then(async () => {
  const beyonce = await User.create({
    firstName: 'Beyoncé',
    lastName: 'Knowles-Carter',
    email: 'beyonce@example.com',
    birthYear: 1981,
    student: false,
    password: 'password',
  });
 /* eslint-disable no-console */
 console.log(`Created user ${beyonce.firstName} ${beyonce.lastName}`);
  const syam = await User.create({
    firstName: 'Syam',
    lastName: 'Sankar',
    email: 'syam@example.com',
    birthYear: 1986,
    student: false,
    password: 'password',
  });
 /* eslint-disable no-console */
 console.log(`Created user ${syam.firstName} ${syam.lastName}`);
  await process.exit();
});
