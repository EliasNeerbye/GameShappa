const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGODB_URI).then(console.log(`Connected to mongodb on: ${process.env.MONGODB_URI}`));

//Middleware activation
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Route Imports
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const tagRoutes = require("./routes/tagRoutes");

app.get("/", (req, res) => {
    res.send("Hello");
});

//Route Connections
app.use("/api/auth", authRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);


app.listen(process.env.PORT);
console.log(`Litening on: http://localhost:${process.env.PORT}`);
