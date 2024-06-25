const Admin = require("../models/admin.modal");
const bcrypt = require('bcrypt');

const createAdmin = async (req, res) => {
    try {
        const { name, image, email, password } = req.body;


        if (!name || !image || !email || !password) {
            return res.status(400).json({
                status: 400,
                message: "All Fields Are required"
            });
        }

        // Check if email is already taken  
        const existingEmail = await Admin.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                status: 409,
                message: "Email is already registered"
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 6);

        
        // Create new user
        const newAdmin = new Admin({
            name,
            image,
            email,
            password: hashPassword
        });

        // Save the user data into the database
        const saveAdmin = await newAdmin.save();
        if (!saveAdmin) {
            return res.status(500).json({
                status: 500,
                message: "Admin is not created",
            });
        }

        // Response with the saved user data
        res.status(201).json({
            status: 201,
            message: "Admin created successfully",
            data: saveAdmin
        });
    } catch (error) {
        // Handle errors
        console.error('Error creating admin:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    createAdmin,
 
};

