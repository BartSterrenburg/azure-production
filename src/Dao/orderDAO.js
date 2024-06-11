const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const orderDAO = {
  getOrders: (callback) => {
    database.query(queryLibrary.getOrders, (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },
};

module.exports = orderDAO;
