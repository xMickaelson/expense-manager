const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const express = require("express");

/**
 * Collecting all routes
 */
const indexRoutes = express.Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/category", categoryRoutes);

module.exports = indexRoutes;
