const fileDAO = require("../Dao/fileDAO");

const fileController = {
    postFile: (req, res) => {
        console.log(req.body);
        const formNummer = req.body.formNummer; 
        const fileLinks = req.body.fileLinks; 
        console.log('Number: ' + formNummer, 'File Links: ' + fileLinks);
    
        if (!formNummer || !fileLinks || !Array.isArray(fileLinks)) {
            return res.status(400).json({
                status: 400,
                message: 'Form number or file links are missing or not in correct format',
                data: {}
            });
        }
    
        // Check if the form number exists in the database
        fileDAO.getFormId(formNummer, (err, formId) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Error checking form number existence',
                    data: {}
                });
            }
    
            if (!formId) {
                return res.status(404).json({
                    status: 404,
                    message: 'Form number does not exist',
                    data: {}
                });
            }
    
            // Insert each file link with the retrieved formId
            const promises = fileLinks.map(fileLink => {
                return new Promise((resolve, reject) => {
                    fileDAO.postFile(formId, fileLink, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            });
    
            // Wait for all promises to resolve
            Promise.all(promises)
                .then(results => {
                    res.status(200).json({
                        status: 200,
                        message: 'All file links saved successfully',
                        data: results
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        status: 500,
                        message: 'Error saving file links',
                        data: {}
                    });
                });
        });
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
}

module.exports = fileController;

// getTBMOrderNummer: (req, res) => {
    //         fileDAO.getTBMOrderNummer((err, data) => {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: "Error fetching data",
    //                     error: err,
    //                 });
    //             }
    //             res.json(data);
    //         });
    //     },
    
    //     getFile: (req, res) => {
    //         const formNummer = req.body.formNummer;
    //         console.log('Received formNummer: ' + formNummer); // Debug log
    //         fileDAO.getFile(formNummer, (err, fileData) => {
    //             if (err) {
    //                 console.error("Error fetching file:", err);
    //                 return res.status(500).json({
    //                     message: "Error fetching file",
    //                     error: err,
    //                 });
    //             }
    //             if (!fileData || fileData.length === 0) {
    //                 console.warn("No file data found for formNummer:", formNummer);
    //                 return res.status(404).json({
    //                     message: "File not found",
    //                 });
    //             }
    //             console.log("Raw fileData:", fileData); // Debug log
    
    //             const processedData = fileData.map(file => ({
    //                 ...file,
    //                 bijlage: file.bijlage ? Buffer.from(file.bijlage, 'binary').toString('base64') : null
    //             }));
    
    //             console.log("Processed fileData:", processedData); // Debug log
    
    //             res.json(processedData);
    //         });
    //     },
    
    //     putFile: (req, res) => {
    //         console.log(req.body);
    //         const formNummer = req.body.formNummer; 
    //         const file = req.files[0]; 
    //         console.log('Number: ' + formNummer, 'File: ' + file.buffer);
    
    //         if (!formNummer || !file) {
    //             return res.status(400).json({
    //                 status: 400,
    //                 message: 'Form number or file is missing',
    //                 data: {}
    //             });
    //         }
    
    //         fileDAO.putFile(formNummer, file.buffer, (err, result) => {
    //             if (err) {
    //                 return res.status(500).json({
    //                     status: 500,
    //                     message: 'Error saving file',
    //                     data: {}
    //                 });
    //             }
    //             res.status(200).json({
    //                 status: 200,
    //                 message: 'File saved successfully',
    //                 data: result
    //             });
    //             console.log("result: ", result + file.buffer);    
    //         });
    //     }
    // }
