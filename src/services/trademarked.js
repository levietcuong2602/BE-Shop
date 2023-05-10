const trademarkedDao = require('../daos/trademarked');
const CustomError = require('../errors/customError');
const errorCodes = require('../errors/code');

const createTrademarked = async ({ name }) => {
  const trademarked = await trademarkedDao.createTrademarked({
    name,
  });
  return trademarked;
};

const getTrademarkeds = async (condition) => {
  const trademarkedList = await trademarkedDao.getTrademarkeds(condition);
  return trademarkedList;
};

const deleteTrademarked = async (trademarkedId) => {
  const trademarked = await trademarkedDao.find(trademarkedId);
  if (!trademarked)
    throw new CustomError(errorCodes.NATIVE_NOT_FOUND, ' does not found');

  await trademarkedDao.deleteTrademarked(trademarkedId);
};

const updateTrademarked = async (trademarkedId, trademarkedUpdate) => {
  const trademarked = await trademarkedDao.find(trademarkedId);
  if (!trademarked) {
    throw new CustomError(errorCodes.NATIVE_NOT_FOUND, ' does not found');
  }

  const trademarkedNew = await trademarkedDao.updateTrademarked(
    trademarkedId,
    trademarkedUpdate,
  );
  return trademarkedNew;
};

const getTrademarkedsSaves = async (condition) => {
  const trademarkedList = await trademarkedDao.getTrademarkedsSaves(condition);
  return trademarkedList;
};

module.exports = {
  createTrademarked,
  getTrademarkeds,
  deleteTrademarked,
  updateTrademarked,
  getTrademarkedsSaves,
};
