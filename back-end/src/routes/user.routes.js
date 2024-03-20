const { Router } = require("express");
const { registerUser } = require("../controllers/user.controller");

const router = Router();

router.route("/register").post(registerUser);
// router.route("/login").post(registerUser);

module.exports = router;
