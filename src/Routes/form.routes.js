const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")


router.get("/api/form/:personeelsnummer", formController.getFormsByPersoneelsnummer)
router.get("/api/form", formController.getAllForms)

//Form routes
router.get("/api/form/WPI/:id", formController.getWPI)
router.get("/api/form/TBM/:id", formController.getTBM)
router.get("/api/form/TRA/:id", formController.getTRA)
router.get("/api/form/MIO/:id", formController.getMIO)

router.get("/api/form/WPI/pdf/:id", formController.getPdfWPI)
router.get("/api/form/TBM/pdf/:id", formController.getPdfTBM)
router.get("/api/form/TRA/pdf/:id", formController.getPdfTRA)
router.get("/api/form/MIO/pdf/:id", formController.getPdfMIO)

router.put("/api/form/WPI/:id", formController.updateWPI)
router.post("/api/form/WPI", formController.saveWPI)
router.post("/api/form/TRA", formController.saveTRA)
router.put("/api/form/MIO/:id", formController.updateMIO)
router.post("/api/form/MIO", formController.saveMIO)
router.put("/api/form/TBM/:id", formController.updateTBM)
router.post("/api/form/TBM", formController.saveTBM)
router.post("/api/form/LMRA", formController.saveLMRA)

router.get("/api/form/TBM/signature/:id", formController.getParticipants)
router.delete("/api/form/TBM/signature/:id", formController.deleteSignature)
router.post("/api/signature", formController.saveSignature)
router.post("/api/taakstap", formController.saveTaakStap)
router.post("/api/gezienVoorUitvoering", formController.saveGezienUitvoering)

module.exports = router