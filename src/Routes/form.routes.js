const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")

//Form routes
router.get("/api/form/WPI/:primarykey", formController.getWPI)
router.get("/api/form/TBM/:primarykey", formController.getTBM)
router.get("/api/form/TRA/:primarykey", formController.getTRA)
router.get("/api/form/MIO/:primarykey", formController.getMIO)

router.post("/api/form/WPI", formController.saveWPI)
router.post("/api/form/TRA", formController.saveTRA)
router.post("/api/form/MIO", formController.saveMIO)
router.post("/api/form/TBM", formController.saveTBM)

router.post("/api/signature", formController.saveSignature)
router.post("/api/taakstap", formController.saveTaakStap)
router.post("/api/gezienVoorUitvoering", formController.saveGezienUitvoering)

module.exports = router