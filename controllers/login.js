const service = require('../services/login');
/**
 * 
 * @param {object} req 
 * @property {object} req.body
 * @property {string} req.body.email
 * @property {string} req.body.password
 * @param {object} res 
 * @param {function} next 
 */
exports.create = async (req, res,next) => {
  try {
    const user= await service.authenticateUser(req.body);
    res.json({user});
  } catch (error) {
    next(error);
  }
};
