const {  adminLogin} = require("../controller/auth.controller")
module.exports = app => {
    app.post("/api/adminlogin", adminLogin)
}