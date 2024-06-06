const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")

//Form routes
router.get("/api/form/WPI/:primarykey", formController.getWPI)
router.post("/api/form/WPI", formController.saveWPI)
router.post("/api/form/TRA", formController.saveTRA)
router.post("/api/form/MIO", formController.saveMIO)
router.post("/api/form/TBM", formController.saveTBM)

router.post("/api/signature", formController.saveSignature)
router.post("/api/taakstap", formController.saveTaakStap)
router.post("/api/gezienVoorUitvoering", formController.saveGezienUitvoering)

module.exports = router

