const orderDAO = require('../Dao/orderDAO');

const orderController = {
    getOrders: (req, res, next) => {
        orderDAO.getOrders((err, data) => {
            if (err) {
                console.error("getOrders error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "Orders found",
                data: data,
            });
        });
    },
}

module.exports = orderController;