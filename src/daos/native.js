/* eslint-disable no-param-reassign */
const {
  Types: { ObjectId },
} = require('mongoose');
const Native = require('../models/native');

const { pagination } = require('../utils/pagination');
const { parseCondition, findDocument } = require('./daoUtil');

const lookupSaves = [
  {
    $lookup: {
      from: 'saves',
      localField: '_id',
      foreignField: 'nativeId',
      as: 'saves',
    },
  },
];

const createNative = async (data) => {
  const native = await Native.create(data);
  return native;
};

const findNative = async (condition) => {
  const native = await findDocument(Native, condition);
  return native;
};

const updateNative = async (id, data) => {
  const native = await Native.findByIdAndUpdate(id, data, {
    new: true,
  });
  return native;
};

const deleteNative = async (nativeId) => {
  await Native.findByIdAndDelete(nativeId);
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

  const [queryResult] = await Native.aggregate([
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
  nativeId = '',
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
  if (nativeId) match._id = ObjectId(nativeId);

  const [queryResult] = await Native.aggregate([
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
  createNative,
  findNative,
  updateNative,
  deleteNative,
  getCategories,
  getCategoriesSaves,
};
