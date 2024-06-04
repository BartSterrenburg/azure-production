const formDAO = require("../Dao/formDAO");

const formController = {


    saveWPI: (req, res, next) => {
        const form = req.body;
        formDAO.saveWPI(form, (err, data) => {
            if (err) {
                console.error("saveWPI error", err);
                return next({
                    status: 500,
                    message: "Internal Server Error",
                    data: {},
                });
            }
            res.json({
                status: 200,
                message: "WPI saved",
                data: data,
            });
        });
    },
};

module.exports = formController;
