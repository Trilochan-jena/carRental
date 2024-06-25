const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addCarSchema = new Schema(
    {
        carName: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        groupSize: {
            type: Number,
            required: true
        },
        rentPrice: {
            type: Number,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
    }, { timestamps: true }
);
const AddCars = model("addCarData", addCarSchema);
module.exports = AddCars;