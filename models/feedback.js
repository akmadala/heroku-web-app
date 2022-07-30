const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    comments: {
        type: String,
        required: true,
        trim: true,
    }
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;