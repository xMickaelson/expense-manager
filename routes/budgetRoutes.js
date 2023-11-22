const express = require("express");
const controller = require("../controller");

const router = express.Router();

router.post("/", controller.getAllBudget);
router.post("/:id", controller.createBudget);
router.put("/:id", controller.updateBudget);

module.exports = router;
