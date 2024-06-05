const express = require("express")
const router = express.Router()
const formController = require("../Controllers/form.controller")

//Form routes
router.post("/api/form/WPI", formController.saveWPI)


module.exports = router

