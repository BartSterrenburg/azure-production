const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const fileDAO = {
    getTBMOrderNummer: (callback) => {
        database.query(
            queryLibrary.getTBMOrderNummer,
            (err, rows) => {
                if (err) {
                    console.error("Error executing query", err);
                    return callback(err, null);
                }
                callback(null, rows);
            }
        );
    },

    checkFormNumberExists: (formNumber, callback) => {
        database.query(
            queryLibrary.checkFormNumberExists,
            formNumber,
            (err, rows) => {
                if (err) {
                    console.error("Error executing query", err);
                    return callback(err, null);
                }
                callback(null, rows[0].count > 0); 
            }
        );
    },

    putFile: (formNumber, fileData, callback) => {
        fileDAO.checkFormNumberExists(formNumber, (err, exists) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            if (!exists) {
                return callback("Form number does not exist", null);
            }
            database.query(
                queryLibrary.putFile,
                [fileData, formNumber], 
                (err, result) => {
                    if (err) {
                        console.error("Error executing query", err);
                        return callback(err, null);
                    }
                    callback(null, result);
                }
            );
        });
    },
    
    getFile: (formNumber, callback) => {
        fileDAO.checkFormNumberExists(formNumber, (err, exists) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            if (!exists) {
                return callback("Form number does not exist", null);
            }
            database.query(
                queryLibrary.getFile,
                formNumber,
                (err, rows) => {
                    if (err) {
                        console.error("Error executing query", err);
                        return callback(err, null);
                    }
                    callback(null, rows); 
                }
            );
        });
    }
};

module.exports = fileDAO;
