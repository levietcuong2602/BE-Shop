const nativeService = require('../services/native');
const { successResponse } = require('../utils/response');

const createNative = async (req, res) => {
  const data = await nativeService.createNative(req.body);
  return res.send({ status: 1, data });
};

const getNatives = async (req, res) => {
  let { startTime, endTime } = req.query;
  if (!startTime) startTime = new Date(0);
  if (!endTime) endTime = new Date();

  const data = await nativeService.getNatives({
    ...req.query,
    startTime,
    endTime,
  });
  return res.send({ status: 1, data });
};

const updateNative = async (req, res) => {
  const { nativeId } = req.params;
  const result = await nativeService.updateNative(nativeId, req.body);
  return successResponse(req, res, result);
};

const deleteNative = async (req, res) => {
  const { nativeId } = req.params;

  await nativeService.deleteNative(nativeId);
  return successResponse(req, res);
};

const getNativesSaves = async (req, res) => {
  let { startTime, endTime } = req.query;
  if (!startTime) startTime = new Date(0);
  if (!endTime) endTime = new Date();

  const data = await nativeService.getNativesSaves({
    ...req.query,
    startTime,
    endTime,
  });
  return res.send({ status: 1, data });
};

module.exports = {
  createNative,
  getNatives,
  updateNative,
  deleteNative,
  getNativesSaves,
};
