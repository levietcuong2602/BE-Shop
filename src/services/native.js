const nativeDao = require('../daos/native');
const CustomError = require('../errors/customError');
const errorCodes = require('../errors/code');

const createNative = async ({ name }) => {
  const native = await nativeDao.createNative({
    name,
  });
  return native;
};

const getNatives = async (condition) => {
  const categories = await nativeDao.getNatives(condition);
  return categories;
};

const deleteNative = async (nativeId) => {
  const native = await nativeDao.find(nativeId);
  if (!native)
    throw new CustomError(errorCodes.NATIVE_NOT_FOUND, ' does not found');

  await nativeDao.deleteNative(nativeId);
};

const updateNative = async (nativeId, Info) => {
  const native = await nativeDao.find(nativeId);
  if (!native) {
    throw new CustomError(errorCodes.NATIVE_NOT_FOUND, ' does not found');
  }

  const nativeUpdate = await nativeDao.updateNative(nativeId, Info);
  return nativeUpdate;
};

const getNativesSaves = async (condition) => {
  const categories = await nativeDao.getNativesSaves(condition);
  return categories;
};

module.exports = {
  createNative,
  getNatives,
  deleteNative,
  updateNative,
  getNativesSaves,
};
