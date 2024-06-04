const database = require('../../dbConnection');
const queryLibrary = require('./queryCollection');

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

    createUser: (user, callback) => {
        database.query(queryLibrary.createUser, [user.personeelsnummer, user.naam, user.email, user.wachtwoord, user.handtekening, user.rol], (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    }

    
};

module.exports = userDAO;
