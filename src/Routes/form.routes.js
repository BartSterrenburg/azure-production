const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")


router.get("/api/form/:personeelsnummer", formController.getFormsByPersoneelsnummer)

//Form routes
router.post("/api/form/WPI", formController.saveWPI)
router.post("/api/form/TRA", formController.saveTRA)
router.get("/api/form/MIO/:id", formController.getMIO)
router.post("/api/form/MIO", formController.saveMIO)
router.get("/api/form/TBM/:id", formController.getTBM)
router.post("/api/form/TBM", formController.saveTBM)

router.get("/api/form/TBM/:formNummer", formController.getTBMKey)

router.post("/api/signature", formController.saveSignature)
router.post("/api/taakstap", formController.saveTaakStap)
router.post("/api/gezienVoorUitvoering", formController.saveGezienUitvoering)

module.exports = router

