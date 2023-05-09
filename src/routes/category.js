const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const categoryController = require('../controllers/category');

const {
  createCategoryValidate,
  getCategoriesValidate,
  updateCategoryValidate,
  deleteCategoryValidate,
  getCategoriesSavesValidate,
} = require('../validations/category');

router.post(
  '/categories',
  createCategoryValidate,
  asyncMiddleware(categoryController.createCategory),
);

router.get(
  '/categories',
  getCategoriesValidate,
  asyncMiddleware(categoryController.getCategories),
);

router.get(
  '/categories/saves',
  getCategoriesSavesValidate,
  asyncMiddleware(categoryController.getCategoriesSaves),
);

/**
 * PUT /api/v1/categories/{id}
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
  '/categories/:categoryId',
  updateCategoryValidate,
  asyncMiddleware(categoryController.updateCategory),
);

/**
 * DELETE /api/v1/categories/{id}
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
  '/categories/:categoryId',
  deleteCategoryValidate,
  asyncMiddleware(categoryController.deleteCategory),
);

module.exports = router;
