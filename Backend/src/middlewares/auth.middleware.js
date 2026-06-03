import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const verifyJWT = asyncHandler( async (req , res , next) => {
    try {
        // ! Needed Token that comes from cookies || header
        const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer " , "");
        if(!token){
            throw new ApiError(401 , "Unauthorized request: Token missing...")
        }
        //! verify it with access Token secret 
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken || !decodedToken._id){
            throw new ApiError(401 , "Invalid token. Please log in again.")
        }
        //! find user with the decoded token id in database
        const user = await User.findById(decodedToken._id).select(" -password -refreshToken ");
        if(!user){
             throw new ApiError(401, "Invalid access token: user not found...");
        }
        //! set req.user = user
        req.user = user;
        next();
    } catch (error) {
         if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired. Please refresh token.");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token. Please log in again.");
    }

    throw new ApiError(401, "Unauthorized. Please log in.");
    }
});

export { verifyJWT };