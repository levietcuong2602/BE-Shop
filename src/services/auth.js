/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');

const errorCodes = require('../errors/code');
const CustomError = require('../errors/customError');

const adminDao = require('../daos/admin');

const { generateId } = require('../utils/string');
const {
  generateSalt,
  encryptPassword,
  comparePassword,
} = require('../utils/auth');

const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require('../configs');

const generateAccessToken = async (adminId) => {
  const accessToken = await jwt.sign({ adminId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const login = async (username, password) => {
  const admin = await adminDao.findAdmin({ username });
  if (!admin) throw new CustomError(errorCodes.NOT_FOUND, 'Admin not found');

  const isCorrectPassword = await comparePassword(password, admin.password);
  if (!isCorrectPassword)
    throw new CustomError(errorCodes.BAD_REQUEST, 'Password incorrect');

  // eslint-disable-next-line no-underscore-dangle
  const adminId = admin._id;
  const accessToken = await generateAccessToken(adminId);
  return accessToken;
};

const verifyAccessToken = async (accessToken) => {
  try {
    const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
    const { adminId } = data;

    const admin = await adminDao.findAdmin(adminId);
    if (!admin) throw new Error();

    return admin;
  } catch (error) {
    throw new CustomError(errorCodes.BAD_REQUEST, 'Token invalid');
  }
};

const register = async ({ username, password, fullName }) => {
  let admin = await adminDao.findAdmin({ username });
  if (admin) throw new CustomError(errorCodes.ADMIN_EXIST);

  const salt = generateSalt(10);
  password = password || generateId(16);
  password = await encryptPassword(password, salt);

  admin = await adminDao.createAdmin({ username, password, fullName });
  return admin;
};

module.exports = {
  login,
  register,
  verifyAccessToken,
};
