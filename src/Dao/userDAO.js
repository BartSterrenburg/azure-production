const database = require('../../dbConnection');
const queryLibrary = require('./queryCollection');
const tokenFunctions = require('./token');

const userDAO = {
    getAllUsers: (callback) => {
        database.query(queryLibrary.getAllUsers, (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            return callback(null, rows);
        });
    },

    getUserById: (id, callback) => {
        database.query(queryLibrary.getUserById, [id], (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    },

    getUserRolByID: (id, callback) => {
        database.query(queryLibrary.getUserRolByID, [id], (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    },

    getUserPasswordByID: (id, callback) => {
        database.query(queryLibrary.getPasswordByID, [id], (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    },
  
    saveWPI: (personeelsnummerEige, callback) => {
        database.query(queryLibrary.saveWPI(personeelsnummerEige), (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    },

// Login user
loginUser: (personeelsnummer, wachtwoord, callback) => {
    database.query(queryLibrary.loginUser, [personeelsnummer, wachtwoord], (err, rows) => {
        if (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
        if (rows.length === 0) {
            const error = new Error("User not found");
            error.code = "USER_NOT_FOUND";
            return callback(error, null);
        }
        const token = tokenFunctions.createToken(personeelsnummer);
        rows[0].token = token;
        callback(null, rows);
    });
},

updateSignature: (personeelsnummer, handtekening, callback) => {
    console.log(personeelsnummer, handtekening);
    database.query(queryLibrary.updateSignature, [personeelsnummer, handtekening], (err, rows) => {
        if (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
        callback(null, rows);
    });
},
};
    

module.exports = userDAO;
