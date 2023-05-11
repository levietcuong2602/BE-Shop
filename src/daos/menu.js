const { MENU_STATUS } = require('../constants');
const Menu = require('../models/menu');
const { findDocument, parseCondition } = require('./daoUtil');

const createMenu = async (menuData) => {
  const menu = await Menu.create(menuData);

  // eslint-disable-next-line no-underscore-dangle
  const menuResult = await findDocument(Menu, menu._id).lean();
  return menuResult;
};

const findMenu = async (condition) => {
  const menu = await findDocument(Menu, condition).lean();
  return menu;
};

const updateMenu = async (menuId, data) => {
  const menu = await Menu.findByIdAndUpdate(menuId, data, {
    new: true,
  });
  return menu;
};

const deleteMenu = async (menuId) => {
  await Menu.findByIdAndDelete(menuId);
};

const getMenus = async () => {
  const result = await Menu.find({
    status: MENU_STATUS.ACTIVE,
  }).lean();
  return result;
};

module.exports = {
  createMenu,
  findMenu,
  updateMenu,
  deleteMenu,
  getMenus,
};
