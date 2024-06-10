const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../Controllers/file.controller');

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  cb(null, true);
}

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.get('/api/form/TBM/ordernummer', fileController.getTBMOrderNummer);

// Add multer middleware to the putFile route
router.put('/api/form/TBM/ordernummer/file', upload.single('file'), fileController.putFile);

router.get('/api/form/TBM/ordernummer/file', fileController.getFile);

module.exports = router;
