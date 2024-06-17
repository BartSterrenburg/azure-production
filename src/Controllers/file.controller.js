const fileDAO = require("../Dao/fileDAO");

const fileController = {
    postFile: async (req, res) => {
        const formNummer = req.params.formNummer;
        const files = req.files;
    
        if (!formNummer || !files || files.length === 0) {
            console.error('Form number or files are missing');
            return res.status(400).json({
                status: 400,
                message: 'Form number or files are missing',
                data: {}
            });
        }
    
        try {
            const filePromises = files.map(file => {
                const fileName = file.originalname;
                const fileData = file.buffer;
    
                return new Promise((resolve, reject) => {
                    fileDAO.postFile(formNummer, fileName, fileData, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            });
    
            const results = await Promise.all(filePromises);
    
            res.status(200).json({
                status: 200,
                message: 'Files saved successfully',
                data: results
            });
        } catch (error) {
            console.error("Error saving files:", error);
            res.status(500).json({
                status: 500,
                message: 'Error saving files',
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
                    return res.status(500).json({
                        status: 500,
                        message: 'Error fetching files',
                        data: {}
                    });
                }

                res.status(200).json({
                    status: 200,
                    message: 'Files fetched successfully',
                    data: result
                });
            });
        } catch (error) {
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
            return res.status(400).json({
                status: 400,
                message: 'Form number or file name is missing',
                data: {}
            });
        }

        try {
            fileDAO.deleteFiles(formNummer, fileName, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: 'Error deleting file',
                        data: {}
                    });
                }

                res.status(200).json({
                    status: 200,
                    message: 'File deleted successfully',
                    data: result
                });
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error deleting file',
                data: {}
            });
        }
    }
};

module.exports = fileController;
