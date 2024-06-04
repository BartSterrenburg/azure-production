const userDAO = require("../Dao/userDAO");

const userController = {
    getAllUsers: (req, res, next) => {
        userDAO.getAllUsers((err, data) => {
            if (err) {
                console.error("getAllUsers error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "All users",
                data: data,
            });
        });
    },
    getUserById: (req, res, next) => {
        const id = req.params.personeelsnummer;
        userDAO.getUserById(id, (err, data) => {
            if (err) {
                console.error("getUserById error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "User by id",
                data: data,
            });
        });
    },
    getUserRolByID: (req, res, next) => {
        const id = req.params.id;
        userDAO.getUserRolByID(id, (err, data) => {
            if (err) {
                console.error("getUserRolByID error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "User role by id",
                data: data,
            });
        });
    },
    getUserPasswordByID: (req, res, next) => {
        const id = req.params.id;
        userDAO.getUserPasswordByID(id, (err, data) => {
            if (err) {
                console.error("getUserPasswordByID error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "User password by id",
                data: data,
            });
        });
    },
};

module.exports = userController;
