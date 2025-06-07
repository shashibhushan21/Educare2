import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { LiveCounselling } from "../models/liveCounselling.model.js";

const submitLiveCounselling = asyncHandler(async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            nationality,
            dateOfBirth,
            gender,
            degree,
            category,
            preferredTime
        } = req.body;

        // Validate all required fields
        if ([
            fullName,
            email,
            phone,
            nationality,
            dateOfBirth,
            gender,
            degree,
            category,
            preferredTime
        ].some((field) => !field?.trim())) {
            throw new ApiError(400, "All fields are required");
        }

        // Create new counselling request
        const counselling = await LiveCounselling.create({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            nationality: nationality.trim(),
            dateOfBirth: new Date(dateOfBirth),
            gender: gender.trim().toLowerCase(),
            degree: degree.trim(),
            category: category.trim(),
            preferredTime: preferredTime.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            counselling
        });
    } catch (error) {
        console.error("Counselling submission error:", error);
        throw new ApiError(500, error.message || "Failed to submit application");
    }
});

export { submitLiveCounselling };