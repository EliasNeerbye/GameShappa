const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();

mongoose.connect(process.env.MONGODB_URI).then(console.log(`Connected to mongodb on: ${process.env.MONGODB_URI}`));

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ["http://gameshappa.caracal.ikt-fag.no", "http://localhost:5173"];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback("CORS not allowed");
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Set-Cookie", "Content-Range", "X-Content-Range"],
    maxAge: 86400,
};


// Enable pre-flight requests for all routes
app.options("*", cors(corsOptions));

// Middleware activation - order is important
app.use(cors(corsOptions));
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
