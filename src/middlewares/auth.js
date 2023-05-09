const asyncMiddleware = require('./async');

const authorize = async (req, res, next) => next();

module.exports = {
  authorize: asyncMiddleware(authorize),
};
