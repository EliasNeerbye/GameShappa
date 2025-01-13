const login = require("./auth/login");
const register = require("./auth/register");

const authController = {
    login: {
        post: login.post,
        get: login.get,
    },

    register: {
        post: register.post,
        get: register.get,
    },
};

module.exports = authController;
