const tokenDAO = require("../Dao/token");

const tokenController = {
    getPersoneelsNummerFromToken: (req, res, next) => {
        const token = req.headers.authorization;
        tokenDAO.getPersoneelsNummerFromToken(token, (err, data) => {
            if (err) {
                console.error("getPersoneelsNummerFromToken error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
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