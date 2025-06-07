import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    }
}, { timestamps: true });

export const Application = mongoose.model('Application', applicationSchema);