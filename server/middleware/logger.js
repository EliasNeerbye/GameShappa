const logger = (req, res, next) => {
    console.log("Logger:");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Body:", req.body);
    console.log("Query:", req.query);
    console.log("Params:", req.params);
    console.log("IP:", req.ip);
    next();
};

module.exports = logger;
