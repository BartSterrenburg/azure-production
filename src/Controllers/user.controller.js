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
   loginUser: (req, res, next) => {
    const personeelsnummer = req.body.employeeNumber; 
    const wachtwoord = req.body.password; 

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
            return res.status(401).json({
                status: 401,
                message: "Invalid employee number or password",
                data: {},
            });
        }
        res.json({
            status: 200,
            message: "Login successful",
            data: rows,
        });
    });
},

    saveWPI: (req, res, next) => {
        const form = req.body;
        userDAO.saveWPI(form, (err, data) => {
            if (err) {
                console.error("saveWPI error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "WPI saved",
                data: data,
            });
        });
    },

    updateSignature: (req, res, next) => {
        console.log("knbvhgjklm");
        console.log(req.body);
        const personeelsnummer = req.params.personeelsnummer;
        console.log(personeelsnummer);
        const handtekening = req.body.handtekening;
        console.log(personeelsnummer, handtekening);
        userDAO.updateSignature(personeelsnummer, handtekening, (err, data) => {
            if (err) {
                console.error("updateSignature error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "Signature updated",
                data: data,
            });
        });
    },

};

module.exports = userController;
