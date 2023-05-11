const authService = require('../services/auth');

const login = async (req, res) => {
  const { username, password } = req.body;
  const accessToken = await authService.login(username, password);
  return res.send({ status: 1, data: { accessToken } });
};

const register = async (req, res) => {
  const { username, password, fullName } = req.body;
  const admin = await authService.register({
    username,
    password,
    fullName,
  });
  return res.send({ status: 1, data: admin });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const admin = await authService.verifyAccessToken(accessToken);
  delete admin.password;
  return res.send({ status: 1, data: { admin } });
};

module.exports = { login, register, verifyAccessToken };
