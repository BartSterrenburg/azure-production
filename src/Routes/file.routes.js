const express = require('express');
const multer = require('multer');
const fileController = require('../Controllers/file.controller');

const router = express.Router();

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.get('/api/form/TBM/ordernummer', fileController.getTBMOrderNummer);

router.put('/api/form/TBM/ordernummer/file', upload.array('file'), fileController.putFile);

router.get('/api/form/TBM/ordernummer/file', fileController.getFile);

module.exports = router;
