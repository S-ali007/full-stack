const { Router } = require("express");
const {
  registerUser,
  logoutUser,
  loginUser,
} = require("../controllers/user.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);

module.exports = router;
