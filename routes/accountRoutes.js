const express = require("express");
const controller = require("../controller");

const router = express.Router();

router.get("/", controller.getAllAccount);
router.post("/", controller.createAccount);
router.put("/:id", controller.updateAccount);
router.delete("/:id", controller.deleteAccount);

module.exports = router;
