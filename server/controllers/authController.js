const login = require("./auth/login");
const register = require("./auth/register");
const logout = require("./auth/logout");
const getUser = require("./auth/getUser");

const authController = {
    login: login.post,

    register: register.post,
    logout: logout.post,

    getUser,
};

module.exports = authController;
