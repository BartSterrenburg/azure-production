const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const fileDAO = {
    postFile: (formNumber, fileName, fileData, callback) => {
        console.log('Executing postFile query');
        console.log('Form Number:', formNumber);
        console.log('File Name:', fileName);
        console.log('File Data (first 100 bytes):', fileData.slice(0, 100));
        
        database.query(queryLibrary.postFile, [formNumber, fileName, fileData], (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return callback(err, null);
            }
            console.log('Query executed successfully:', result);
            callback(null, result);
        });
    },

    getFiles: (formNumber, callback) => {
        console.log('Executing getFiles query');
        console.log('Form Number:', formNumber);
        
        database.query(queryLibrary.getFiles, [formNumber], (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return callback(err, null);
            }
            console.log('Query executed successfully:', result);
            callback(null, result);
        });
    }
};

module.exports = fileDAO;
