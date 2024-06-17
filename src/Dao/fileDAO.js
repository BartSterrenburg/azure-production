const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const fileDAO = {
    postFile: (formNumber, fileName, fileData, callback) => {    
        database.query(queryLibrary.postFile, [formNumber, fileName, fileData], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    getFiles: (formNumber, callback) => {
        database.query(queryLibrary.getFiles, [formNumber], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    deleteFiles: (formNumber, fileName, callback) => {
        database.query(queryLibrary.deleteFiles, [fileName, formNumber], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }    
};

module.exports = fileDAO;
