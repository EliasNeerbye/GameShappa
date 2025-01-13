const login = require("./auth/login");
const register = require("./auth/register");

const authController = {
    login: {
        post: login.post,
    },

    register: {
        post: register.post,
    },
};

module.exports = authController;
