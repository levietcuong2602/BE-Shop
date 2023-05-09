const categoryDao = require('../daos/category');
const CustomError = require('../errors/customError');
const errorCodes = require('../errors/code');

const createCategory = async ({ name }) => {
  const category = await categoryDao.createCategory({
    name,
  });
  return category;
};

const getCategories = async (condition) => {
  const categories = await categoryDao.getCategories(condition);
  return categories;
};

const deleteCategory = async (categoryId) => {
  const category = await categoryDao.find(categoryId);
  if (!category)
    throw new CustomError(errorCodes._CATEGORY_NOT_FOUND, ' does not found');

  await categoryDao.deleteCategory(categoryId);
};

const updateCategory = async (CategoryId, Info) => {
  const category = await categoryDao.find(CategoryId);
  if (!category) {
    throw new CustomError(errorCodes._CATEGORY_NOT_FOUND, ' does not found');
  }

  const categoryUpdate = await categoryDao.updateCategory(CategoryId, Info);
  return categoryUpdate;
};

const getCategoriesSaves = async (condition) => {
  const categories = await categoryDao.getCategoriesSaves(condition);
  return categories;
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategoriesSaves,
};
