const authService = require('../services/auth');

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await authService.login(email, password);
  return res.send({ status: 1, data: { accessToken } });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const admin = await authService.verifyAccessToken(accessToken);
  delete admin.password;
  return res.send({ status: 1, data: { admin } });
};

module.exports = { login, verifyAccessToken };
