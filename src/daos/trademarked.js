/* eslint-disable no-param-reassign */
const Trademarked = require('../models/trademarked');

const { pagination } = require('../utils/pagination');
const { parseCondition, findDocument } = require('./daoUtil');

const createTrademarked = async (data) => {
  const trademarked = await Trademarked.create(data);
  return trademarked;
};

const findTrademarked = async (condition) => {
  const trademarked = await findDocument(Trademarked, condition);
  return trademarked;
};

const updateTrademarked = async (id, data) => {
  const trademarked = await Trademarked.findByIdAndUpdate(id, data, {
    new: true,
  });
  return trademarked;
};

const deleteTrademarked = async (trademarkedId) => {
  await Trademarked.findByIdAndDelete(trademarkedId);
};

const getTrademarkedList = async ({
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

  const [queryResult] = await Trademarked.aggregate([
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

module.exports = {
  createTrademarked,
  findTrademarked,
  updateTrademarked,
  deleteTrademarked,
  getTrademarkedList,
};
