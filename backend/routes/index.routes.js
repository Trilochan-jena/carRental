module.exports = app => {
    require("./user.routes")(app);
    require("./admin.routes")(app);
    require("./auth.routes")(app);
    require("./addCars.routes")(app);

}