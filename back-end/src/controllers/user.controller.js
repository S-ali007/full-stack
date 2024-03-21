const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const User = require("../models/todos/user.models.js");

const generateAuthTokenAndRefresh = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAuthToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "server error ....Access and refresh Token");
  }
};
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
    return console.log("first");
  }

  const existedUser = await User.findOne({ email }).select(
    " -password -createdAt -updatedAt"
  );
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

const loginUser = asyncHandler(async (req, res) => {
  // get data from request body
  // email or username
  // find the username or email
  // password check
  // access and refresh token
  // send secure cookies

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email Required !");
  }
  const existedUser = await User.findOne({ email });
  // console.log(existedUser);
  if (!existedUser) {
    throw new ApiError(404, "User Doesnot Exist ....Please SignUp!");
  }

  const isPasswordVaild = await existedUser.isPasswordCorrect(password);
  if (!isPasswordVaild) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  const { accessToken } = await generateAuthTokenAndRefresh(existedUser._id);
  const loggedInUser = await User.findById(existedUser._id).select(
    "-password "
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "loggedIn SuccessFully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findById(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "LoggedOut Successfully !!"));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
