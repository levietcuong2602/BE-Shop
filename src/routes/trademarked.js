const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const trademarkedController = require('../controllers/trademarked');

const {
  createTrademarkedValidate,
  getTrademarkedsValidate,
  updateTrademarkedValidate,
  deleteTrademarkedValidate,
  getTrademarkedsSavesValidate,
} = require('../validations/trademarked');

router.post(
  '/trademarkeds',
  createTrademarkedValidate,
  asyncMiddleware(trademarkedController.createTrademarked),
);

router.get(
  '/trademarkeds',
  getTrademarkedsValidate,
  asyncMiddleware(trademarkedController.getTrademarkeds),
);

router.get(
  '/trademarkeds/saves',
  getTrademarkedsSavesValidate,
  asyncMiddleware(trademarkedController.getTrademarkedsSaves),
);

/**
 * PUT /api/v1/trademarkeds/{id}
 * @summary Update admin
 * @tags Admin
 * @param {string} id.path.required
 * @param {NewClient} request.body.required
 * @security BearerAuth
 * @return {object} 200 - success response
 * @return {object} 500 - error response
 * @example request
 * {
 *     "name": "Admin4",
 *     "password": "123"
 * }
 * @example response - 200 - success response
 * {
 *     "code": 200,
 *     "data": {
 *         "created_at": "2022-04-22T08:07:09.408Z",
 *         "email": "admin@gmail.com",
 *         "id": 77,
 *         "name": "Admin4",
 *         "updated_at": "2022-04-22T08:07:09.408Z"
 *     },
 *     "status": 1
 * }
 * @example response - 500 - admin does not exists"
 * {
 *     "code": 1202,
 *     "status": 0,
 *     "message": "Admin does not exists"
 * }
 */
router.put(
  '/trademarkeds/:trademarkedId',
  updateTrademarkedValidate,
  asyncMiddleware(trademarkedController.updateTrademarked),
);

/**
 * DELETE /api/v1/trademarkeds/{id}
 * @summary Delete admin
 * @tags Admin
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {object} 200 - success response
 * @return {object} 500 - admin does not exist
 * @example response - 200 - success response
 * {
 *   "code": 200,
 *   "status": 1
 * }
 * @example response - 500 - admin does not exist
 * {
 *   "code": 1102,
 *   "status": 0,
 *   "message": "Admin does not exists"
 * }
 */
router.delete(
  '/trademarkeds/:trademarkedId',
  deleteTrademarkedValidate,
  asyncMiddleware(trademarkedController.deleteTrademarked),
);

module.exports = router;
