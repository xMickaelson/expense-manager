const userController = require('./userController')
const categoryController = require('./categoryController')
const accountController = require('./accountController')
const budgetController = require('./budgetController')
const expenseController = require('./expenseController')

/**
 * Exporting all controllers all together
 */
module.exports = {
    ...userController,
    ...categoryController,
    ...accountController,
    ...budgetController,
    ...expenseController
}