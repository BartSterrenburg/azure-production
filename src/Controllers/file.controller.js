const fileDAO = require("../Dao/fileDAO");

const fileController = {
    postFile: async (req, res) => {
        const formNummer = req.params.formNummer;
        const files = req.files;

        if (!formNummer || !files || files.length === 0) {
            console.error('Form number or file is missing');
            return res.status(400).json({
                status: 400,
                message: 'Form number or file is missing',
                data: {}
            });
        }

        const file = files[0]; 
        const fileName = file.originalname;
        const fileData = file.buffer;

        console.log("Formnummer:", formNummer);
        console.log("FileName:", fileName);
        console.log("File (first 100 bytes):", fileData.slice(0, 100));

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

                console.log("File saved successfully:", result);
                res.status(200).json({
                    status: 200,
                    message: 'File saved successfully',
                    data: result
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

    getFiles: async (req, res) => {
        const formNummer = req.params.formNummer;

        if (!formNummer) {
            console.error('Form number is missing');
            return res.status(400).json({
                status: 400,
                message: 'Form number is missing',
                data: {}
            });
        }

        try {
            fileDAO.getFiles(formNummer, (err, result) => {
                if (err) {
                    console.error("Error fetching files:", err);
                    return res.status(500).json({
                        status: 500,
                        message: 'Error fetching files',
                        data: {}
                    });
                }

                console.log("Files fetched successfully:", result);
                res.status(200).json({
                    status: 200,
                    message: 'Files fetched successfully',
                    data: result
                });
            });
        } catch (error) {
            console.error("Error fetching files:", error);
            res.status(500).json({
                status: 500,
                message: 'Error fetching files',
                data: {}
            });
        }
    },

    deleteFiles: async (req, res) => { 
        const formNummer = req.params.formNummer;
        const fileName = req.params.fileName;

        if (!formNummer || !fileName) {
            console.error('Form number or file name is missing');
            return res.status(400).json({
                status: 400,
                message: 'Form number or file name is missing',
                data: {}
            });
        }

        try {
            fileDAO.deleteFiles(formNummer, fileName, (err, result) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return res.status(500).json({
                        status: 500,
                        message: 'Error deleting file',
                        data: {}
                    });
                }

                console.log("File deleted successfully:", result);
                res.status(200).json({
                    status: 200,
                    message: 'File deleted successfully',
                    data: result
                });
            });
        } catch (error) {
            console.error("Error deleting file:", error);
            res.status(500).json({
                status: 500,
                message: 'Error deleting file',
                data: {}
            });
        }
    }
};

module.exports = fileController;
