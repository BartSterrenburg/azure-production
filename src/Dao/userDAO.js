const database = require('../../dbConnection');
const queryLibrary = require('./queryCollection');
const tokenFunctions = require('./token');
const encryptionFunctions = require('../functions/encryption');
const e = require('cors');

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
loginUser: async function(personeelsnummer, wachtwoord, callback) {
    database.query(queryLibrary.loginUser, [personeelsnummer], async (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
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
    });
  },
  

updateSignature: (personeelsnummer, handtekening, callback) => {
    console.log(personeelsnummer, handtekening);
    database.query(queryLibrary.updateSignature, [handtekening, personeelsnummer], (err, rows) => {
        if (err) {
            console.error("Error executing query", err);
            return callback(err, null);
        }
        callback(null, rows);
    });
},


  // Check if password matches
  // FUNCTION
  checkIfPasswordMatches: function(id, password) {
    return new Promise((resolve, reject) => {
      const query = queryLibrary.loginUser;
      database.query(query, [id], async (error, results) => {
        if (error) {
          reject(error);
          return;
        }
  
        console.log(results);
        await encryptionFunctions.comparePassword(password, results[0].wachtwoord)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  },
  
};
    

module.exports = userDAO;
