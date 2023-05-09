const mongoose = require('mongoose');

const { CATEGORY_STATUS } = require('../constants');

const categorySchema = new mongoose.Schema(
  {
    categoryId: String,
    name: String,
    status: {
      type: String,
      enum: Object.values(CATEGORY_STATUS),
      default: CATEGORY_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Category', categorySchema);
