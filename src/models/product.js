const mongoose = require('mongoose');
const { PRODUCT_STATUS } = require('../constants');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const productSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    categoryId: {
      type: ObjectId,
      ref: 'Category',
    },
    numberOfInbound: Number,
    numberOfOutbound: Number,
    purchasePrice: Number,
    retailPrice: Number,
    inventoryQuantity: Number,
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
    },
    avatarUrl: String,
    thumbnailUrls: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Product', productSchema);
