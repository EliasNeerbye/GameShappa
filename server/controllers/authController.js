const login = require("./auth/login");
const register = require("./auth/register");
const getUser = require("./auth/getUser");

const authController = {
    login: login.post,

    register: register.post,

    getUser,
};

module.exports = authController;
