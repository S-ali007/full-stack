const User = require("../models/todos/user.models");
const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "Unauthorize Request");
    }

    const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(200)
      .json(new ApiError(401, "Invaild Access Token", error));
  }
});

module.exports = {
  verifyJwt,
};
