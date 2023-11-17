const userController = require('./userController')
const categoryController = require('./categoryController')

/**
 * Exporting all controllers all together
 */
module.exports = {
    ...userController,
    ...categoryController
}