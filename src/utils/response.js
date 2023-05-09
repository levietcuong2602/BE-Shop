/* eslint-disable no-unused-vars */
const multer = require('multer');

const CustomError = require('../errors/customError');
const errorCodes = require('../errors/code');

const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    status: 1,
  });

const errorResponse = ({
  req,
  res,
  statusCode = 500,
  code = 500,
  message = 'Something went wrong',
  details,
}) =>
  res.status(statusCode).json({
    code,
    status: 0,
    message,
    details,
  });

const uploadFileErrorResponse = (next, err) => {
  console.error('uploadFileErrorResponse: ', err);

  if (err instanceof multer.MulterError) {
    /* eslint-disable prettier/prettier */
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return next(new CustomError(errorCodes.LIMIT_FILE_SIZE, err.message));
      case 'LIMIT_PART_COUNT':
        return next(new CustomError(errorCodes.LIMIT_PART_COUNT, err.message));
      case 'LIMI_FILE_COUNT':
        return next(new CustomError(errorCodes.LIMI_FILE_COUNT, err.message));
      case 'LIMIT_FIELD_KEY':
        return next(new CustomError(errorCodes.LIMIT_FIELD_KEY, err.message));
      case 'LIMIT_FIELD_VALUE':
        return next(new CustomError(errorCodes.LIMIT_FIELD_VALUE, err.message));
      case 'LIMIT_FIELD_COUNT':
        return next(new CustomError(errorCodes.LIMIT_FIELD_COUNT, err.message));
      case 'LIMIT_UNEXPECTED_FILE':
        return next(
          new CustomError(errorCodes.LIMIT_UNEXPECTED_FILE, err.message),
        );
      default:
        return next(new CustomError(errorCodes.ERROR_UPLOAD, err.message));
      /* eslint-enable prettier/prettier */
    }
  } else if (err) {
    return next(err);
  }

  return null;
};

module.exports = { successResponse, errorResponse, uploadFileErrorResponse };
