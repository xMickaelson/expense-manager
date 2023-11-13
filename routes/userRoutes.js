const express = require("express");
const controller = require('../controller');
const authentication = require("../middleware/authentication");

const router = express.Router()

router.get('/hello', authentication, controller.hello)
router.get('/token', controller.token)

module.exports = router