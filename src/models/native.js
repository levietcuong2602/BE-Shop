const mongoose = require('mongoose');

const { NATIVE_STATUS } = require('../constants');

const nativeSchema = new mongoose.Schema(
  {
    nativeId: String,
    name: String,
    status: {
      type: String,
      enum: Object.values(NATIVE_STATUS),
      default: NATIVE_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Native', nativeSchema);
