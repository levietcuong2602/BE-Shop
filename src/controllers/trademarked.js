const trademarkedService = require('../services/trademarked');
const { successResponse } = require('../utils/response');

const createTrademarked = async (req, res) => {
  const data = await trademarkedService.createTrademarked(req.body);
  return res.send({ status: 1, data });
};

const getTrademarkeds = async (req, res) => {
  let { startTime, endTime } = req.query;
  if (!startTime) startTime = new Date(0);
  if (!endTime) endTime = new Date();

  const data = await trademarkedService.getTrademarkeds({
    ...req.query,
    startTime,
    endTime,
  });
  return res.send({ status: 1, data });
};

const updateTrademarked = async (req, res) => {
  const { trademarkedId } = req.params;
  const result = await trademarkedService.updateTrademarked(
    trademarkedId,
    req.body,
  );
  return successResponse(req, res, result);
};

const deleteTrademarked = async (req, res) => {
  const { trademarkedId } = req.params;

  await trademarkedService.deleteTrademarked(trademarkedId);
  return successResponse(req, res);
};

const getTrademarkedsSaves = async (req, res) => {
  let { startTime, endTime } = req.query;
  if (!startTime) startTime = new Date(0);
  if (!endTime) endTime = new Date();

  const data = await trademarkedService.getTrademarkedsSaves({
    ...req.query,
    startTime,
    endTime,
  });
  return res.send({ status: 1, data });
};

module.exports = {
  createTrademarked,
  getTrademarkeds,
  updateTrademarked,
  deleteTrademarked,
  getTrademarkedsSaves,
};
