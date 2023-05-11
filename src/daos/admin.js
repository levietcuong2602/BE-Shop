const Admin = require('../models/admin');
const { findDocument, parseCondition } = require('./daoUtil');
const { pagination } = require('../utils/pagination');

const createAdmin = async (adminData) => {
  const admin = await Admin.create(adminData);

  // eslint-disable-next-line no-underscore-dangle
  const adminResult = await findDocument(Admin, admin._id).lean();
  return adminResult;
};

const findAdmin = async (condition) => {
  const admin = await findDocument(Admin, condition).lean();
  return admin;
};

const updateAdmin = async (adminId, data) => {
  const admin = await Admin.findByIdAndUpdate(adminId, data, {
    new: true,
  });
  return admin;
};

const deleteAdmin = async (adminId) => {
  await Admin.findByIdAndDelete(adminId);
};

const getAdmins = async ({
  limit = 10,
  pageNum,
  inputText,
  startTime = new Date(0),
  endTime = new Date(),
  ...options
}) => {
  // eslint-disable-next-line no-param-reassign
  limit = parseInt(limit, 10);
  const match = parseCondition(options);
  const offset = pageNum > 0 ? (pageNum - 1) * limit : 0;

  if (inputText) {
    const searchRegex = new RegExp(inputText, 'gi');
    match.$or = [{ name: searchRegex }, { displayId: searchRegex }];
  }

  const [queryResult] = await Admin.aggregate([
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
      $project: {
        script: 0,
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
  createAdmin,
  findAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmins,
};
