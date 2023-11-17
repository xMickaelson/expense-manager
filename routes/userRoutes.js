const express = require("express");
const controller = require("../controller");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.get("/login", controller.login);
router.post("/register", controller.register);
router.get("/verify", authentication, controller.verify);

module.exports = router;
