const router = require('express').Router();
const authController = require('../controllers/auth');
const asyncMiddleware = require('../middlewares/async');
const { loginValidate } = require('../validations/auth');

/* eslint-disable prettier/prettier */
/**
 * NewAdmin
 * @typedef {object} NewAdmin
 * @property {string} email.required - Email of admin
 * @property {string} password.required - Password of admin
 */

/**
 * POST /api/v1/auths/login
 * @summary Login
 * @tags Admin
 * @param {NewAdmin} request.body.required
 * @return {object} 200 - success response
 * @return {object} 400 - bad request
 * @return {object} 404 - Admin not found
 * @example request
 * {
 *     "email": "admin@gmail.com",
 *     "password": "password"
 * }
 * @example response - 200 - success response
 * {
 *     "status": 1,
 *     "result": {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo2OSwiaWF0IjoxNjUwNDI5MDU5LCJleHAiOjE2NTA0NTkwNTl9.EG79jkyo9PtNEZBOFBBEiy5kLKaCDds2eVOj2tjSbn1"
 *     }
 * }
 * @example response - 400 - password incorrect
 * {
 *     "code": 400,
 *     "status": 0,
 *     "message": "Password incorrect"
 * }
 * @example response - 404 - admin not found
 * {
 *     "code": 404,
 *     "status": 0,
 *     "message": "Admin not found"
 * }
 */
router.post(
  '/auths/login',
  loginValidate,
  asyncMiddleware(authController.login),
);

/**
 * GET /api/v1/auths/verify
 * @summary Verify access token
 * @tags Admin
 * @security BearerAuth
 * @return {object} 200 - success response
 * @return {object} 400 - bad request
 * @example response - 200 - success response
 * {
 *     "result": {
 *         "admin": {
 *             "created_at": "2022-04-20T02:53:35.000Z",
 *             "email": "admin@gmail.com",
 *             "id": 69,
 *             "updated_at": "2022-04-20T02:53:35.000Z"
 *         }
 *     },
 *     "status": 1
 * }
 * @example response - 400 - password incorrect
 * {
 *     "code": 400,
 *     "status": 0,
 *     "message": "Token invalid"
 * }
 */
router.get('/auths/verify', asyncMiddleware(authController.verifyAccessToken));

module.exports = router;
