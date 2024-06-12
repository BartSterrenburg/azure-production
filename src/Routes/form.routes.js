const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")


router.get("/api/form/:personeelsnummer", formController.getFormsByPersoneelsnummer)

//Form routes
router.get("/api/form/WPI/:id", formController.getWPI)
router.get("/api/form/TBM/:id", formController.getTBM)
router.get("/api/form/TRA/:id", formController.getTRA)
router.get("/api/form/MIO/:id", formController.getMIO)

router.post("/api/form/WPI", formController.saveWPI)
router.post("/api/form/TRA", formController.saveTRA)
router.put("/api/form/MIO/:id", formController.updateMIO)
router.post("/api/form/MIO", formController.saveMIO)
router.post("/api/form/TBM", formController.saveTBM)
router.post("/api/form/LMRA", formController.saveLMRA)

router.post("/api/signature", formController.saveSignature)
router.post("/api/taakstap", formController.saveTaakStap)
router.post("/api/gezienVoorUitvoering", formController.saveGezienUitvoering)

module.exports = router