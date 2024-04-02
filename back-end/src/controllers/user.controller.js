const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const User = require("../models/todos/user.models.js");
const jwt = require("jsonwebtoken");
const generateAuthTokenAndRefresh = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "server error ....Access and refresh Token");
  }
};

const generateRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    return { newRefreshToken };
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
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

  const emailValidator = User.schema.path("email").validators[1];

  const emailValidationResult = emailValidator.validator(email);
  if (!emailValidationResult) {
    return res
      .status(400)
      .json(new ApiError(400, "", `${email} is not a valid email address!`));
  }

  const passwordValidator = User.schema
    .path("password")
    .validators.find((validator) => validator.type === "minlength");
  const passwordMinLength = passwordValidator?.minlength;

  if (password.length < passwordMinLength) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "",
          `Password must be at least ${passwordMinLength} characters long`
        )
      );
  }

  const existedUser = await User.findOne({ email }).select(
    " -password -createdAt -updatedAt"
  );
  // console.log(existedUser,"user")
  if (existedUser) {
    return res
      .status(409)
      .json(new ApiError(409, existedUser, "Email Already Exist !"));
    // new ApiError(409, "Email Already Exist !");
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
    return res.status(400).json(new ApiError(400, "", "Email Required !"));
  }
  const emailValidator = User.schema.path("email").validators[1];

  const emailValidationResult = emailValidator.validator(email);
  if (!emailValidationResult) {
    return res
      .status(400)
      .json(new ApiError(400, "", `${email} is not a valid email address!`));
  }
  const existedUser = await User.findOne({ email });
  // console.log(existedUser);
  if (!existedUser) {
    return res
      .status(404)
      .json(new ApiError(404, "", "User Doesnot Exist ....Please SignUp!"));
  }

  const isPasswordVaild = await existedUser.isPasswordCorrect(password);
  if (!isPasswordVaild) {
    return res
      .status(401)
      .json(new ApiError(401, "", "Invalid User Credentials"));
  }

  const { accessToken, refreshToken } = await generateAuthTokenAndRefresh(
    existedUser?._id
  );
  const loggedInUser = await User.findById(existedUser?._id).select(
    "-password -refreshToken "
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "loggedIn SuccessFully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = User.findById(req.user._id);
  try {
    if (userId) {
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "LoggedOut Successfully !!"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Already Logged Out"));
    }
  } catch (error) {
    console.log(error, "error");
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken = await req.cookies.refreshToken;

    // console.log(incomingRefreshToken, "refreshtokenIncomming");
    if (incomingRefreshToken) {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decodedToken?._id);
      if (!user) {
        return res
          .status(401)
          .json(new ApiError(401, "", "Invalid Refresh Token"));
      }

      const { refreshToken } = await generateAuthTokenAndRefresh(user?._id);
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      const options = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("refreshToken", refreshToken, options);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { newRefreshToken: refreshToken },
            "Refreshed Successfully!"
          )
        );
    }
   
  } catch (error) {
    return res.status(401).json(new ApiError(401, "", "Invalid Refresh Token"));
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
