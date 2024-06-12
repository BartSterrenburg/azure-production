const express = require('express');
const fileController = require('../Controllers/file.controller');

const router = express.Router();

router.post('/api/form/TBM/ordernummer/file', fileController.postFile);

router.get('/api/form/TBM/ordernummer/file/:formnummer', fileController.getFiles);

module.exports = router;
