const userService = require('../services/user');

const getMenuList = async (req, res) => {
  const menuList = await userService.getMenuList();
  return res.send({ status: 1, data: menuList });
};

module.exports = { getMenuList };
