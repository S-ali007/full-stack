const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const User = require("../models/todos/user.models.js");
const registerUser = asyncHandler(async (req, res) => {
  // get User Details from frontend
  // validation -not empty
  // check if user already exists:username ,email
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  // get User Details

  const { firstName, lastName, email, password } = req.body;
  // console.log(req.body);

  if ( 
    [firstName, lastName, email, password].some(
      (field) => field && field.trim() == ""
    )
  ) {
    return console.log("first")
  }

  const existedUser = await User.findOne({ email }).select( " -password -createdAt -updatedAt");
  // console.log(existedUser,"user")
  if (existedUser) {
    throw new ApiError(409, "Email Already Exist !");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-lastname -email -password"
  );
  // console.log(createdUser,"88888888888888");
  // if (!createdUser) {
  //   return res.status(500).json(new ApiError(500, "Can't create User"));
  // }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

module.exports = {
  registerUser,
};
