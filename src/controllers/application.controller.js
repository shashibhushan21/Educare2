import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Application } from "../models/application.model.js";

const submitApplication = asyncHandler(async (req, res) => {
    const { name, phone, email, city } = req.body;

    if ([name, phone, email, city].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const application = await Application.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim()
    });

    return res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        application
    });
});

export { submitApplication };