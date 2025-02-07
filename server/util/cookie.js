require("dotenv").config();

const day = 1000 * 60 * 60 * 24;
const maxAge = day * 7;

let secure = false;
if (process.env.ENVIRONMENT === "production") {
    secure = true;
}

const createCookie = async (res, name, cookie) => {
    try {
        res.cookie(name, cookie, {
            httpOnly: true,
            maxAge,
            secure,
            sameSite: "strict",
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = createCookie;
