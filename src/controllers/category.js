const CategoryService = require('../services/category');
const { successResponse } = require('../utils/response');

const createCategory = async (req, res) => {
  const data = await CategoryService.createCategory(req.body);
  return res.send({ status: 1, data });
};

const getCategories = async (req, res) => {
  let { startTime, endTime } = req.query;
  if (!startTime) startTime = new Date(0);
  if (!endTime) endTime = new Date();

  const data = await CategoryService.getCategories({
    ...req.query,
    startTime,
    endTime,
  });
  return res.send({ status: 1, data });
};

const updateCategory = async (req, res) => {
  const { cateforyId } = req.params;
  const result = await CategoryService.updateCategory(cateforyId, req.body);
  return successResponse(req, res, result);
};

const deleteCategory = async (req, res) => {
  const { CateforyId } = req.params;

  await CategoryService.deleteCategory(CateforyId);
  return successResponse(req, res);
};

const getCategoriesSaves = async (req, res) => {
  let { startTime, endTime } = req.query;
  if (!startTime) startTime = new Date(0);
  if (!endTime) endTime = new Date();

  const data = await CategoryService.getCategoriesSaves({
    ...req.query,
    startTime,
    endTime,
  });
  return res.send({ status: 1, data });
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoriesSaves,
};
