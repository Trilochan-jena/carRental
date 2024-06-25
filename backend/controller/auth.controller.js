const Admin = require("../models/admin.modal");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                status: 400,
                message: 'All fields (email, password ) are required.',
            });
        }
        const adminEmail = await Admin.findOne({ email });
        if (!adminEmail) {
            return res.json({
                status: 401,
                message: 'Admin data not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, adminEmail.password);
        if (!isPasswordValid) {
            return res.json({
                status: 402,
                message: 'Incorrect Password',
            });
        }
        const token = jwt.sign(
            { email: adminEmail.email, userId: adminEmail._id },
            process.env.jwt_secretkey,
            { expiresIn: '8h' });
        // Return the response
        res.json({
            status: 201,
            message: 'Admin data is found',
            adminData: adminEmail,
            token: token
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            status: 500,
            message: 'Internal Server Error',
        });
    }


}
module.exports = {
    adminLogin
}