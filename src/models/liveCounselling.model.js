import mongoose from 'mongoose';

const liveCounsellingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
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
    nationality: {
        type: String,
        required: [true, "Nationality is required"],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ['male', 'female']
    },
    degree: {
        type: String,
        required: [true, "Degree is required"],
        enum: ['UG', 'PG', 'PhD']
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    preferredTime: {
        type: String,
        required: [true, "Preferred counselling time is required"]
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed'],
        default: 'pending'
    }
}, { timestamps: true });

export const LiveCounselling = mongoose.model('LiveCounselling', liveCounsellingSchema);