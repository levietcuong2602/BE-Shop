/* eslint-disable no-param-reassign */
const {
  Types: { ObjectId },
} = require('mongoose');
const Category = require('../models/category');

const { pagination } = require('../utils/pagination');
const { parseCondition, findDocument } = require('./daoUtil');

const lookupSaves = [
  {
    $lookup: {
      from: 'saves',
      localField: '_id',
      foreignField: 'categoryId',
      as: 'saves',
    },
  },
];

const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

const findCategory = async (condition) => {
  const category = await findDocument(Category, condition);
  return category;
};

const updateCategory = async (Id, data) => {
  const category = await Category.findByIdAndUpdate(Id, data, {
    new: true,
  });
  return category;
};

const deleteCategory = async (categoryId) => {
  await Category.findByIdAndDelete(categoryId);
};

const getCategories = async ({
  limit = 10,
  pageNum,
  inputText,
  startTime = new Date(0),
  endTime = new Date(),
  ...options
}) => {
  limit = parseInt(limit, 10);
  const match = parseCondition(options);
  const offset = pageNum > 0 ? (pageNum - 1) * limit : 0;

  if (inputText) {
    const searchRegex = new RegExp(inputText, 'gi');
    match.$or = [{ name: searchRegex }, { displayId: searchRegex }];
  }

  const [queryResult] = await Category.aggregate([
    {
      $match: {
        ...match,
        createdAt: {
          $gte: new Date(startTime),
          $lte: new Date(endTime),
        },
      },
    },
    {
      $facet: {
        result: [
          { $sort: { createdAt: -1 } },
          { $skip: offset },
          { $limit: limit },
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]);
  const { result, totalCount } = queryResult;
  const total = totalCount[0] ? totalCount[0].count : 0;

  return pagination({ data: result, totalCount: total, pageNum, limit });
};

const getCategoriesSaves = async ({
  limit = 10,
  pageNum,
  inputText,
  startTime = new Date(0),
  endTime = new Date(),
  categoryId = '',
  ...options
}) => {
  limit = parseInt(limit, 10);
  const match = parseCondition(options);
  const offset = pageNum > 0 ? (pageNum - 1) * limit : 0;

  if (inputText) {
    const searchRegex = new RegExp(inputText, 'gi');
    match.$or = [{ name: searchRegex }, { displayId: searchRegex }];
  }
  // eslint-disable-next-line no-underscore-dangle
  if (categoryId) match._id = ObjectId(categoryId);

  const [queryResult] = await Category.aggregate([
    {
      $match: {
        ...match,
        createdAt: {
          $gte: new Date(startTime),
          $lte: new Date(endTime),
        },
      },
    },
    ...lookupSaves,
    {
      $facet: {
        result: [
          { $sort: { createdAt: -1 } },
          { $skip: offset },
          { $limit: limit },
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]);
  const { result, totalCount } = queryResult;
  const total = totalCount[0] ? totalCount[0].count : 0;

  return pagination({ data: result, totalCount: total, pageNum, limit });
};

module.exports = {
  createCategory,
  findCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoriesSaves,
};
