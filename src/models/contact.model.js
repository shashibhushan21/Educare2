import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true
    }
}, {timestamps: true});

export const Contact = mongoose.model('Contact', contactSchema);