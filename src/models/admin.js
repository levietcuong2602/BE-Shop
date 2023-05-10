const mongoose = require('mongoose');

const { ADMIN_STATUS } = require('../constants');

const adminSchema = new mongoose.Schema(
  {
    fullName: String,
    username: String,
    password: String,
    status: {
      type: String,
      enum: Object.values(ADMIN_STATUS),
      default: ADMIN_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Native', adminSchema);
