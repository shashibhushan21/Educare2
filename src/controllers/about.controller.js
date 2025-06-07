import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { AboutForm } from "../models/about.model.js";

const submitAboutForm = asyncHandler(async (req, res) => {
    const { name, email, mobile, country, state, city } = req.body;

    if ([name, email, mobile, country, state, city].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const aboutForm = await AboutForm.create({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        country: country.trim(),
        state: state.trim(),
        city: city.trim()
    });

    return res.status(201).json({
        success: true,
        message: "Form submitted successfully",
        aboutForm
    });
});

export { submitAboutForm };