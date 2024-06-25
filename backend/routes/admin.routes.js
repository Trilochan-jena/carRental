const { createAdmin} = require("../controller/admin.controller");
module.exports = app => {
    app.post("/api/create_admin", createAdmin)

}