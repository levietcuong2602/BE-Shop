const { PRODUCT_STATUS } = require('./product');
const { CATEGORY_STATUS } = require('./category');
const { NATIVE_STATUS } = require('./native');
const { TRADEMARKED_STATUS } = require('./trademarked');
const { ADMIN_STATUS } = require('./admin');

const TIME = {
  A_WEEK: 7 * 86400 * 1000,
};

module.exports = {
  TIME,
  PRODUCT_STATUS,
  CATEGORY_STATUS,
  NATIVE_STATUS,
  TRADEMARKED_STATUS,
  ADMIN_STATUS,
};
