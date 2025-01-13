const User = require("../../models/User");

const login = {
    get: (req, res) => {
        res.send("Login");
    },

    post: (req, res) => {
        res.send("LoginPost");
    },
};

module.exports = login;
