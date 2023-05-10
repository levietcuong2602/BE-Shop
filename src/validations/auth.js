const { Joi, validate } = require('express-validation');

const login = {
  body: Joi.object({
    username: Joi.string().trim().lowercase().required(),
    password: Joi.string().trim().required(),
    captchaToken: Joi.string().trim().required(),
  }),
};

module.exports = {
  loginValidate: validate(login, { keyByField: true }),
};
