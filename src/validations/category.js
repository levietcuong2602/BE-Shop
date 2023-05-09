const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');

const createCategory = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const getCategories = {
  query: Joi.object({
    inputSearch: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    limit: Joi.number().default(10),
    pageNum: Joi.number().default(1),
  }),
};

const getCategoriesSaves = {
  query: Joi.object({
    inputSearch: Joi.string(),
    categoryId: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    limit: Joi.number().default(10),
    pageNum: Joi.number().default(1),
  }),
};

const updateCategory = {
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

const deleteCategory = {
  params: Joi.object({
    CategoryId: Joi.string().required(),
  }),
};

module.exports = {
  createCategoryValidate: customValidate(createCategory),
  getCategoriesValidate: customValidate(getCategories),
  updateCategoryValidate: customValidate(updateCategory),
  deleteCategoryValidate: customValidate(deleteCategory),
  getCategoriesSavesValidate: customValidate(getCategoriesSaves),
};
