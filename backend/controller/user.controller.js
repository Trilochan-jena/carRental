const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;


        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({
                status: 400,
                message: "All Fields Are required"
            });
        }

        // Check if email is already taken
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                status: 409,
                message: "Email is already registered"
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 6);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashPassword
        });

        // Save the user data into the database
        const saveUser = await newUser.save();
        if (!saveUser) {
            return res.status(500).json({
                status: 500,
                message: "User is not created",
            });
        }

        // Response with the saved user data
        res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
};
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    deleteUser,
};

