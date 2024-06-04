const database = require('../../dbConnection');
const queryLibrary = require('./queryCollection');

const formDAO = {
    saveWPI: (form, callback) => {
        database.query(queryLibrary.postWPI, [form.formNummer, form.personeelsnummerEigenaar, form.datum, form.project], (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    }
};

module.exports = formDAO;
