require("dotenv").config();

const day = 1000 * 60 * 60 * 24;

const createCookie = async (res, name, cookie) => {
    try {
        res.cookie(name, cookie, {
            httpOnly: true,
            maxAge: day * 7,
            secure: process.env.ENVIRONMENT === "production",
            sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
            domain: process.env.ENVIRONMENT === "production" ? "gameshappa.caracal.ikt-fag.no" : undefined,
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};


module.exports = createCookie;
