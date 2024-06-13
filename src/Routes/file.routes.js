const express = require('express');
const multer = require('multer');
const fileController = require('../Controllers/file.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/api/form/TBM/file/:formNummer', upload.array('files'), fileController.postFile);

router.get('/api/form/TBM/ordernummer/file/:formNummer', fileController.getFiles);

module.exports = router;
