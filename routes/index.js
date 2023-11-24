const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const accountRoutes = require("./accountRoutes");
const budgetRoutes = require("./budgetRoutes");
const expenseRoutes = require("./expenseRoutes");
const express = require("express");
const authentication = require("../middleware/authentication");

/**
 * Collecting all routes
 */
const indexRoutes = express.Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/category", authentication, categoryRoutes);
indexRoutes.use("/account", authentication, accountRoutes);
indexRoutes.use("/budget", authentication, budgetRoutes);
indexRoutes.use("/expense", authentication, expenseRoutes);

module.exports = indexRoutes;
