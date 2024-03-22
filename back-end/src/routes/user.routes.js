const { Router } = require("express");
const {
  registerUser,
  logoutUser,
  loginUser,
  refreshAccessToken,
} = require("../controllers/user.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// secure Route
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
