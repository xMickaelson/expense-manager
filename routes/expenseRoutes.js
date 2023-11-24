const express = require("express");
const controller = require("../controller");

const router = express.Router();

router.post("/", controller.getAllExpense);
router.post("/create", controller.createExpense);
router.put("/:id", controller.updateExpense);
router.delete("/:id", controller.deleteExpense);

module.exports = router;