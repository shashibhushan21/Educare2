import mongoose from 'mongoose';

const aboutFormSchema = new mongoose.Schema({
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
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    }
}, {timestamps: true});

export const AboutForm = mongoose.model('AboutForm', aboutFormSchema);