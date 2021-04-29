var express = require("express");
var router = express.Router();
var authController = require("./controllers/AuthController");

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/validate", authController.validate_token);
router.post("/auth/confirm", authController.confirm);

module.exports = router;
