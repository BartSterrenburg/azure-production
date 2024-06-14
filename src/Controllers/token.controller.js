const tokenDAO = require("../Dao/token");

const tokenController = {
    getPersoneelsNummerFromToken: (req, res, next) => {
        const token = req.headers.authorization;
        tokenDAO.getPersoneelsNummerFromToken(token, (err, data) => {
            if (err) {
                console.error("getPersoneelsNummerFromToken error", err);
                return next({
                    status: 401,
                    message: "Internal Server Error (token is either not provided or invalid)",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "Personeelsnummer by token",
                data: data,
            });
        });
    },
};

module.exports = tokenController;