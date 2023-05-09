/* eslint-disable import/no-unresolved */
const { TIME } = require('../constants');

const {
  PORT,

  MONGO_URI,

  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
  NODE_ENV,
  PEPPER,
} = process.env;

const PAGE_NUMBER_DEFAULT = 0;
const PAGE_SIZE_DEFAULT = 10;

const REQUEST_TIMEOUT = 15 * 1000;

module.exports = {
  PORT: PORT || 3000,
  MONGO_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: parseInt(JWT_EXPIRES_TIME, 10) || TIME.A_WEEK,
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT,

  NODE_ENV,

  REQUEST_TIMEOUT,
  PEPPER,
};
