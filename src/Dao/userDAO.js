const { sql, poolPromise } = require('../../dbConnection');
const queryLibrary = require('./queryCollection');
const tokenFunctions = require('./token');
const encryptionFunctions = require('../functions/encryption');

const userDAO = {
    getAllUsers: async (callback) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(queryLibrary.getAllUsers);
            return callback(null, result.recordset);
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },

    getUserById: async (id, callback) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(queryLibrary.getUserById);
            return callback(null, result.recordset);
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },

    getUserRolByID: async (id, callback) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(queryLibrary.getUserRolByID);
            return callback(null, result.recordset);
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },

    getUserPasswordByID: async (id, callback) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(queryLibrary.getPasswordByID);
            return callback(null, result.recordset);
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },
  
    saveWPI: async (personeelsnummerEige, callback) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('personeelsnummerEige', sql.Int, personeelsnummerEige)
                .query(queryLibrary.saveWPI(personeelsnummerEige));
            return callback(null, result.recordset);
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },

    loginUser: async function(personeelsnummer, wachtwoord, callback) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('personeelsnummer', sql.Int, personeelsnummer)
                .query(queryLibrary.loginUser);

            const rows = result.recordset;

            if (rows.length === 0) {
                const error = new Error("User not found");
                error.code = "USER_NOT_FOUND";
                return callback(error, null);
            }
            const wachtwoordHash = rows[0].wachtwoord;
      
            try {
                const result = await this.checkIfPasswordMatches(personeelsnummer, wachtwoord);
                if (!result) {
                    const error = new Error("Password incorrect");
                    error.code = "PASSWORD_INCORRECT";
                    return callback(error, null);
                }
  
                const token = tokenFunctions.createToken(personeelsnummer);
                rows[0].token = token;
                callback(null, rows);
            } catch (error) {
                console.error("Error comparing passwords", error);
                return callback(error, null);
            }
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },
  
    updateSignature: async (personeelsnummer, handtekening, callback) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('personeelsnummer', sql.Int, personeelsnummer)
                .input('handtekening', sql.VarChar, handtekening)
                .query(queryLibrary.updateSignature);
            return callback(null, result.recordset);
        } catch (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
    },

    checkIfPasswordMatches: function(id, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input('id', sql.Int, id)
                    .query(queryLibrary.loginUser);

                const rows = result.recordset;

                if (rows.length === 0) {
                    return reject(new Error("User not found"));
                }

                await encryptionFunctions.comparePassword(password, rows[0].wachtwoord)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (err) {
                reject(err);
            }
        });
    }
};

module.exports = userDAO;
