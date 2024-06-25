const AddCars = require("../models/addCar.modal");

const createAddcars = async (req, res) => {
    try {
        const { carName, category, type, groupSize, rentPrice, imgUrl } = req.body;
        if (!carName || !category || !type || !groupSize || !rentPrice || !imgUrl) {
            return res.status(400).json({
                status: 400,
                message: "All Fields Are required"
            })
        }
        // create cars data
        const newCarsData = new AddCars({
            carName,
            category,
            type,
            groupSize,
            rentPrice,
            imgUrl
        })
        // save carData into database
        const saveCarsData = newCarsData.save();
        if (!saveCarsData) {
            return res.status(500).json({
                status: 500,
                message: "User is not created",
            });

        }
        res.status(201).json({
            status: 201,
            message: "AddCars Data created successfully",
            data: saveCarsData

        })
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
}

const getAllCars = async (req, res) => {
    try {
        const cars = await AddCars.find();

        if (!cars) {
            return res.status(404).json({
                message: "No cars found"
            });
        }

        res.json({
            status: 200,
            message: "cars retrieved successfully",
            data: cars
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
const getCarById = async (req, res) => {

    try {
        const { userId } = req.body;

        const carData = await AddCars.findById(userId);

        if (!carData) {
            return res.status(400).json({
                status: 400,
                error: 'Car data is not found.',
            });
        }
        // Return the response
        res.status(201).json({
            status: 201,
            message: 'Car data is found',
            data: carData,
        });

    } catch (error) {
        // Handle unexpected errors
        console.error('Error creating :', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
};


const deleteCar = async (req, res) => {

    try {
        const userId = req.body.userId;
        const carDelete = await AddCars.findByIdAndDelete(userId);
        if (!carDelete) {
            return res.status(400).json({
                status: 400,
                error: 'delete unsuccessfull.',
            });
        }
        // Return the response
        res.status(201).json({
            status: 201,
            message: ' delete sucessfull',
            data: carDelete,
        });

    } catch (error) {
        // Handle unexpected errors
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    createAddcars,
    getAllCars,
    getCarById,
    deleteCar,
};
