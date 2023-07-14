const userRoutes = require("./userRoutes");
const express = require("express");

/**
 * Collecting all routes
 */
const indexRoutes = express.Router();

indexRoutes.use("/user", userRoutes);

module.exports = indexRoutes;
