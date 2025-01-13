const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(process.env.PORT);
console.log(`Litening on port: ${process.env.PORT}`);
