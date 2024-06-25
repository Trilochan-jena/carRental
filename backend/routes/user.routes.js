const { createUser, getAllUser, getUserById, deleteUser } = require("../controller/user.controller");
module.exports = app => {
    app.post("/api/create_user", createUser),
    app.get("/api/users", getAllUser);
    app.get("/api/users/:userId", getUserById);
    app.delete("/api/users/:userId", deleteUser);
}