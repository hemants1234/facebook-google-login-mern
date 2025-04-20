import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async(req, _, next) => {
   console.log("this is req obj",req)
try {
    
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     
     console.log(token)

     if(!token){
        throw new ApiError(401, "Unauthorized request")
     }
    
     const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    
     const user = await User.findById(decodeToken?._id)
    
     if(!user){
        throw new ApiError(401, "Invalid Access Token")
     }   
     console.log(user)
     req.user = user;
     next();

} catch (error) {
    throw new ApiError(401, "Invalid access Token")
}
   
})