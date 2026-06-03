import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(400, "User not found...");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(" Access and Refresh Token Error ", error);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new ApiError(400, "Fill all the fields...");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User with this email already exists...");
  }

  const user = await User.create({
    userName,
    email: email.toLowerCase(),
    password,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const createdUser = await User.findById(user._id).select(
    " -password -refreshToken ",
  );
  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while creating user...");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User Created Successfullu...",
      ),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Fill all the fields...");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User with this email not found...");
  }

  const checkPassword = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new ApiError(400, "Incorrect Password...");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken ",
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User LoggedIn Successfullu...",
      ),
    );
});

const logoutUser = asyncHandler(async (req , res) => {
    await User.findByIdAndUpdate(req.user._id , 
        {
        $set : {
            refreshToken : undefined
        }
    },
    { new : true}
)

return res.status(200)
        .clearCookie("accessToken" , clearCookieOptions)
        .clearCookie("refreshToken" , clearCookieOptions)
        .json(new ApiResponse(200 , {} , "User logged Out successfully..."))
});

export { registerUser, loginUser };
