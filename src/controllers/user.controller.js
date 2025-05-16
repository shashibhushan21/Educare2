import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// creating method for accessToken or refreshToken generation
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Adding value to user object
        user.refreshToken = refreshToken

        // saving the updated object
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    };
}


// register user

const registerUser = asyncHandler(async (req, res) => {
    // console.log("Content-Type:", req.headers['content-type']);
    // console.log("Request body received:", req.body);

    // Add check for empty request body
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, "No data received. Please provide registration details");
    }

    const { name, email, contact, course, password, confirmPassword } = req.body;


    try {
        if (
            [name, email, contact, course, password, confirmPassword].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        // Validate passwords match
        if (password !== confirmPassword) {
            throw new ApiError(400, "Passwords do not match");
        }

        // check if user already exits: username, email

        const existedUser = await User.findOne({ email })

        if (existedUser) {
            throw new ApiError(409, "User with email already exists")
        }


        // create user object - create entry in db

        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            contact: contact.trim(),
            course: course.trim(),
            password
        });


        // remove password and refresh token field on respponse

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        // check for user creation

        if (!createdUser) {
            throw new ApiError(500, "User creation failed")
        }

        // Redirect directly to login page with a success parameter
        return res.redirect('/login?registered=true');

    } catch (error) {
        // Handle specific MongoDB errors
        if (error.code === 11000) { // Duplicate key error
            throw new ApiError(409, "Email already registered");
        }
        throw error; // Re-throw other errors
    }

})


// login user

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    try {
        if (!email) {
            throw new ApiError(400, "email is required")
        }

        // find the user form database
        const user = await User.findOne({ email })

        // check if user exists
        if (!user) {
            throw new ApiError(404, "User does not exist")
        }

        // check if password is correct
        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(404, " Invalid credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        // sending secured cookie 
        const options = {
            httpOnly: true,
            secure: true
        }

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)

        // Then redirect (this will actually redirect the browser)
        return res.redirect('/');
    } catch (error) {
        // If there's an error, send it as JSON
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Login failed"
        });
    }

})



// logout user

const logoutUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            }
        )
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
    
        return res.redirect('/?logout=true');
    } catch (error) {
        throw new ApiError(500, "Error during logout");
    }
})


export {
    registerUser,
    loginUser,
    logoutUser
}