const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
        },
        password: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const User = model("userData", userSchema);
module.exports = User;