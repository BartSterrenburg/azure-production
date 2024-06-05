const express = require("express")
const router = express.Router()
const tokenController = require("../Controllers/token.controller")

router.get("/api/token", tokenController.getPersoneelsNummerFromToken)

module.exports = router