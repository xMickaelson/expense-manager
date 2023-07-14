const userController = require('./userController')

/**
 * Exporting all controllers all together
 */
module.exports = {
    ...userController
}