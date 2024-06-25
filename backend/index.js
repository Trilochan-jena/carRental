const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.port || 5000;
const dotenv = require("dotenv");
const cors = require("cors")
app.use(cors())
app.use(express.json());

dotenv.config()
// mongoDB is connected
mongoose.connect(process.env.mongo_dbURL)
    .then(() => {
        console.log("MONGODB has been Connected");
    })
    .catch((error) => {
        console.log(error, "MongoDB is not connected");
    })
require("./routes/index.routes")(app)
const http = require("http");

// server is connected
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`server is running at ${port}`);
})