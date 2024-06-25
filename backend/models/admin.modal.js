const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Admin = model("adminData", adminSchema);
module.exports = Admin;