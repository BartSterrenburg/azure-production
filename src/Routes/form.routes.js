const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")

//Form routes
router.post("/api/form/WPI", formController.saveWPI)
router.post("/api/form/TRA", formController.saveTRA)
router.post("/api/form/MIO", formController.saveMIO)


module.exports = router

