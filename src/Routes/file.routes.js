const express = require('express');
const router = express.Router();
const fileController = require('../Controllers/file.controller');

module.exports = function(upload) {
    router.post('/api/form/TBM/file/:formNummer', upload.array('files'), fileController.postFile);
    router.get('/api/form/TBM/file/:formNummer', fileController.getFiles);
    router.delete('/api/form/TBM/file/:formNummer/:fileName', fileController.deleteFiles);

    return router;
};
