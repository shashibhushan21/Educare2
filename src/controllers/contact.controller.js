import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Contact } from "../models/contact.model.js";

const submitContact = asyncHandler(async (req, res) => {
    const { name, email, phone, address, message } = req.body;

    if ([name, email, phone, address, message].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const contact = await Contact.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        message: message.trim()
    });

    return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        contact
    });
});

export { submitContact };