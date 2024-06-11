const fileDAO = require("../Dao/fileDAO");

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
            res.send(fileData);
        });
    },

    putFile: (req, res) => {
        console.log(req.body);
        const formNummer = req.body.formNummer; 
        const file = req.files[0]; 

        if (!formNummer || !file) {
            return res.status(400).json({
                status: 400,
                message: 'Form number or file is missing',
                data: {}
            });
        }

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
            console.log("result: ", result + file.buffer);    
        });
    }
}

module.exports = fileController;
