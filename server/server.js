const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGODB_URI).then(console.log(`Connected to mongodb on: ${process.env.MONGODB_URI}`));

//Middleware activation
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Imports
const authRoutes = require("./routes/authRoutes");
app.get("/", (req, res) => {
    res.send("Hello");
});

//Route Connections
app.use("/api/auth", authRoutes);


app.listen(process.env.PORT);
console.log(`Litening on: http://localhost:${process.env.PORT}`);
