const mongoose = require('mongoose');

const { TRADEMARKED_STATUS } = require('../constants');

const trademarkedSchema = new mongoose.Schema(
  {
    trademarkedId: String,
    name: String,
    avatarUrl: String,
    status: {
      type: String,
      enum: Object.values(TRADEMARKED_STATUS),
      default: TRADEMARKED_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Category', trademarkedSchema);
