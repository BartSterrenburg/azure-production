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
        const formNummer = req.body.formNummer; // Extract formNummer from the form-data
        const file = req.files; // Assuming a single file upload, extract the file object
    
        if (!formNummer || !file) {
            return res.status(400).json({
                status: 400,
                message: 'Form number or file is missing',
                data: {}
            });
        }
    
        // Call your DAO function to handle database operations
        fileDAO.putFile(formNummer, file.buffer, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Error saving file',
                    data: {}
                });
            }
            res.status(200).json({
                status: 200,
                message: 'File saved successfully',
                data: result
            });
        });
    },
}

module.exports = fileController;
