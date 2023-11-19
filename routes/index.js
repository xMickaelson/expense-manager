const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const accountRoutes = require("./accountRoutes");
const express = require("express");
const authentication = require("../middleware/authentication");

/**
 * Collecting all routes
 */
const indexRoutes = express.Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/category", authentication, categoryRoutes);
indexRoutes.use("/account", authentication, accountRoutes);

module.exports = indexRoutes;
