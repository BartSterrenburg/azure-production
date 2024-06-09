const express = require("express")
const router = express.Router()
const fileController = require("../Controllers/file.controller")

router.get("/api/form/TBM/ordernummer", fileController.getTBMOrderNummer);
router.put("/api/form/TBM/ordernummer/file", fileController.putFile)
router.get("/api/form/TBM/ordernummer/file", fileController.getFile)



module.exports = router

