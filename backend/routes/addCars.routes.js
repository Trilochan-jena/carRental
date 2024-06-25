const { createAddcars,getAllCars,getCarById,deleteCar, } = require("../controller/addCar.controller");

module.exports = app => {
    app.post("/api/createAddCars", createAddcars)
    app.get("/api/getAddCars", getAllCars)
    app.get("/api/getCarsId", getCarById)
    app.delete("/api/delectCars", deleteCar)
}

