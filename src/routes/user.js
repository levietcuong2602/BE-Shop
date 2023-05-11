const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const userController = require('../controllers/user');

/**
 * GET /api/v1/users/menu
 * @summary Get User Menu
 * @tags User
 * @return {object} 200 - success response
 * @return {object} 500 - error response
 * @example request
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
router.get('/users/menu', asyncMiddleware(userController.getMenuList));

router.get('/users/notice', (req, res) => res.send({ status: 200, data: [] }));

module.exports = router;
