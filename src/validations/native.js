const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');

const createNative = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const getNatives = {
  query: Joi.object({
    inputSearch: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    limit: Joi.number().default(10),
    pageNum: Joi.number().default(1),
  }),
};

const getNativesSaves = {
  query: Joi.object({
    inputSearch: Joi.string(),
    nativeId: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    limit: Joi.number().default(10),
    pageNum: Joi.number().default(1),
  }),
};

const updateNative = {
  params: Joi.object({
    nativeId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

const deleteNative = {
  params: Joi.object({
    nativeId: Joi.string().required(),
  }),
};

module.exports = {
  createNativeValidate: customValidate(createNative),
  getNativesValidate: customValidate(getNatives),
  updateNativeValidate: customValidate(updateNative),
  deleteNativeValidate: customValidate(deleteNative),
  getNativesSavesValidate: customValidate(getNativesSaves),
};
