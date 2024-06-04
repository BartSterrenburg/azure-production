const express = require("express")
const router = express.Router()
const userController = require("../Controllers/user.controller")

router.get("/api/user", userController.getAllUsers)
router.get("/api/user/:personeelsnummer", userController.getUserById)
router.get("/api/user/rol/:personeelsnummer", userController.getUserRolByID)
router.get("/api/user/password/:personeelsnummer", userController.getUserPasswordByID)
router.post("/api/user", userController.createUser)
router.get("/api/login", userController.loginUser)

router.post("/api/user/WPI", userController.saveWPI)

module.exports = router