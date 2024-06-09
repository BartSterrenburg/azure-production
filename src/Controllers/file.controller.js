const fileDAO = require("../Dao/fileDAO");
const { putFile } = require("../Dao/queryCollection");

const fileController = {
    getTBMOrderNummer: (req, res) => {
        fileDAO.getTBMOrderNummer((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Error fetching data",
                    error: err,
                });
            }
            res.json(data);
        });
    },

    getFile: (req, res) => {
        const formNummer = req.body.formNummer; 
        fileDAO.getFile(formNummer, (err, fileData) => {
            if (err) {
                return res.status(500).json({
                    message: "Error fetching file",
                    error: err,
                });
            }
            if (!fileData) {
                return res.status(404).json({
                    message: "File not found",
                });
            }
            res.send(fileData.bijlage);
        });
    },

    putFile: (req, res) => {
        const formNummer = req.body.formNummer;
        const fileData = req.body.file;
        fileDAO.putFile(formNummer, fileData, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error updating file",
                    error: err,
                });
            }
            res.json({
                message: "File updated successfully",
                data: fileData  
            });
        });
    },
   
}

module.exports = fileController;
