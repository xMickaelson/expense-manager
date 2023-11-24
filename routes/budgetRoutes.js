const express = require("express");
const controller = require("../controller");

const router = express.Router();

router.post("/", controller.getAllBudget);
router.post("/:id", controller.createBudget);
router.put("/:id", controller.updateBudget);
router.delete("/:id", controller.deleteBudget);

module.exports = router;
