const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const fileDAO = {
    
    getFormId: (formNumber, callback) => {
        database.query(queryLibrary.getTBMOrderNummer, [formNumber], (err, result) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            if (result.length === 0) {
                return callback(null, null); // Form number does not exist
            }
            const formId = result[0].formId;
            callback(null, formId);
        });
    },

    postFile: (formNumber, fileName, fileData, callback) => {
        database.query(queryLibrary.postFile, [formNumber, fileName, fileData], (err, result) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    checkFormNumberExists: (formNumber, callback) => {
        database.query(queryLibrary.checkFormNumberExists, [formNumber], (err, result) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            const exists = result[0].count > 0;
            callback(null, exists);
        });
    },

        

  
    getFiles: (formNumber, callback) => {
        fileDAO.checkFormNumberExists(formNumber, (err, exists) => {
            if (err) {
                console.error("Error checking form number existence", err);
                return callback(err, null);
            }
            if (!exists) {
                return callback("Form number does not exist", null);
            }
            database.query(queryLibrary.getFiles, [formNumber], (err, rows) => {
                if (err) {
                    console.error("Error executing query", err);
                    return callback(err, null);
                }
                callback(null, rows); 
            });
        });
    }

   
}

module.exports = fileDAO;

