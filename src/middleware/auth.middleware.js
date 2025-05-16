import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token || "no token found")

        if (token) {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            // console.log(decodedToken)
    
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
            // console.log(user)
            req.user = user;
            res.locals.user = user; // make user available in response locals
        }
        next();
        
    } catch (error) {
        res.locals.user = null;
        next();
    }
})