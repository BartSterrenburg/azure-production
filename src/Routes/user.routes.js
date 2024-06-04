const express = require("express")
const router = express.Router()
const userController = require("../Controllers/user.controller")

router.get("/api/users", userController.getAllUsers)
router.get("/api/user/:personeelsnummer", userController.getUserById)

module.exports = router