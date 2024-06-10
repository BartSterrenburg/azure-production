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
        // Haal formNummer op uit FormData
        const formNummer = req.body.formNummer;
    
        // Haal het bestand op uit FormData
        const fileData = req.body.file;
    
        // Voer de logica uit om het bestand bij te werken in de database
        fileDAO.putFile(formNummer, fileData, (err, result) => {
            if (err) {
                // Als er een fout optreedt, stuur een foutmelding terug naar de client
                return res.status(500).json({
                    message: "Error updating file",
                    error: err,
                });
            }
            // Als alles goed gaat, stuur een succesbericht terug naar de client
            res.json({
                message: "File updated successfully",
                data: fileData  
            });
        });
    },
    
}

module.exports = fileController;
