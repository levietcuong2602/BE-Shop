const menuListMock = require('../mock/menu.mock');
const menuDaos = require('../daos/menu');
const { logger } = require('../utils/logger');

const getMenuList = async () => {
  const menuList = await menuDaos.getMenus();
  return menuList.map(({ children = [], ...menuItem }) => {
    if (children.length) return { children, ...menuItem };

    return menuItem;
  });
};

const createUsersMenuItem = async () => {
  logger.info('Create Menu Item Starting...');
  await Promise.all(
    menuListMock.map((menuItem) => menuDaos.createMenu(menuItem)),
  );
  logger.info('Create Menu Item Finished!');
};

module.exports = { getMenuList, createUsersMenuItem };
