const mongoose = require('mongoose');
const { MENU_STATUS } = require('../constants/menu');

const MenuLabel = {
  zh_CN: String,
  en_US: String,
  vi_VN: String,
};

const menuSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    label: MenuLabel,
    icon: String,
    path: String,
    children: [this],
    status: {
      type: String,
      enum: Object.values(MENU_STATUS),
      default: MENU_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Menu', menuSchema);
