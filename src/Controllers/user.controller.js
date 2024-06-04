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
        const id = req.params.personeelsnummer;
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
        const id = req.params.personeelsnummer;
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

   // Login user
    // Login user
    loginUser: (req, res, next) => {
        const personeelsnummer = req.body.personeelsnummer;
        const wachtwoord = req.body.wachtwoord;

        userDAO.loginUser(personeelsnummer, wachtwoord, (err, rows) => {
            if (err) {
                console.error("loginUser error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            if (rows.length === 0) {
                // No user found with the given credentials
                return res.status(401).json({
                    status: 401,
                    message: "Invalid employee number or password",
                    data: {},
                });
            }
            // User found, login successful
            res.json({
                status: 200,
                message: `User logged in with personeelsnummer ${personeelsnummer} and wachtwoord ${wachtwoord} successfully`,
                data: rows, 
            });
        });
    },
};

module.exports = userController;
