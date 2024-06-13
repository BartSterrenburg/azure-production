const fileDAO = require("../Dao/fileDAO");

const fileController = {

    postFile: async (req, res) => {
        const formNummer = req.params.formNummer;
        const files = req.files;

        if (!formNummer || !files || files.length === 0) {
            return res.status(400).json({
                status: 400,
                message: 'Form number or file is missing',
                data: {}
            });
        }

        const file = files[0]; 

        const fileName = file.originalname;
        const fileData = file.buffer;

        try {
            fileDAO.postFile(formNummer, fileName, fileData, (err, result) => {
                if (err) {
                    console.error("Error saving file:", err);
                    return res.status(500).json({
                        status: 500,
                        message: 'Error saving file',
                        data: {}
                    });
                }

                res.status(200).json({
                    status: 200,
                    message: 'File saved successfully',
                    data: { formNummer, fileName, fileData }
                });
            });
        } catch (error) {
            console.error("Error saving file:", error);
            res.status(500).json({
                status: 500,
                message: 'Error saving file',
                data: {}
            });
        }
    },
    
    getFiles: (req, res) => {
        const formNummer = req.params.formnummer;
    
        if (!formNummer) {
            return res.status(400).json({
                status: 400,
                message: 'Form number is missing',
                data: {}
            });
        }
    
        console.log('Received formNummer: ' + formNummer); // Debug log
    
        fileDAO.getFiles(formNummer, (err, fileLinks) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Error fetching file links',
                    data: {}
                });
            }
    
            res.status(200).json({
                status: 200,
                message: 'File links fetched successfully',
                data: fileLinks
            });
        });
    }
};

module.exports = fileController;

