const express = require("express")
const router = express.Router()
const userController = require("../Controllers/user.controller")

router.get("/api/users", userController.getAllUsers)
router.post("/api/WPI", userController.saveWPI)
router.get("/api/user/:personeelsnummer", userController.getUserById)
router.get("/api/user/rol/:personeelsnummer", userController.getUserRolByID)
router.get("/api/user/password/:personeelsnummer", userController.getUserPasswordByID)

module.exports = router