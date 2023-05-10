const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');

const createTrademarked = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const getTrademarkeds = {
  query: Joi.object({
    inputSearch: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    limit: Joi.number().default(10),
    pageNum: Joi.number().default(1),
  }),
};

const getTrademarkedsSaves = {
  query: Joi.object({
    inputSearch: Joi.string(),
    trademarkedId: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    limit: Joi.number().default(10),
    pageNum: Joi.number().default(1),
  }),
};

const updateTrademarked = {
  params: Joi.object({
    trademarkedId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

const deleteTrademarked = {
  params: Joi.object({
    trademarkedId: Joi.string().required(),
  }),
};

module.exports = {
  createTrademarkedValidate: customValidate(createTrademarked),
  getTrademarkedsValidate: customValidate(getTrademarkeds),
  updateTrademarkedValidate: customValidate(updateTrademarked),
  deleteTrademarkedValidate: customValidate(deleteTrademarked),
  getTrademarkedsSavesValidate: customValidate(getTrademarkedsSaves),
};
