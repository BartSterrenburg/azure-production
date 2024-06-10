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
                callback(null, rows[0].count > 0); // Check of het formulier bestaat
            }
        );
    },

    putFile: (formNumber, fileData, callback) => {
        // Controleer eerst of het formulier bestaat
        fileDAO.checkFormNumberExists(formNumber, (err, exists) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            if (!exists) {
                return callback("Form number does not exist", null);
            }
            // Het formulier bestaat, voer de query uit om het bestand bij te werken
            database.query(
                queryLibrary.putFile,
                [fileData, formNumber], // Plaats de bestand- en formulier nummer parameters in een array
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
        // Controleer eerst of het formulier bestaat
        fileDAO.checkFormNumberExists(formNumber, (err, exists) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            if (!exists) {
                return callback("Form number does not exist", null);
            }
            // Het formulier bestaat, voer de query uit om het bestand op te halen
            database.query(
                queryLibrary.getFile,
                formNumber,
                (err, rows) => {
                    if (err) {
                        console.error("Error executing query", err);
                        return callback(err, null);
                    }
                    callback(null, rows[0]); // Return het eerste resultaat (bijlage)
                }
            );
        });
    }
};

module.exports = fileDAO;
