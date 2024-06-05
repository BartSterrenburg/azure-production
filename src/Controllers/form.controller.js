const formDAO = require("../Dao/formDAO");

const formController = {


    saveWPI: (req, res, next) => {
        const form = req.body;
        console.log(form.nummer)
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

    saveTRA: (req, res, next) => {
        console.log('works')
        const form = req.body;
        formDAO.saveTRA(form, (err, data) => {
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
                message: "TRA saved",
                data: data,
            });
        });
    },
};

module.exports = formController;
