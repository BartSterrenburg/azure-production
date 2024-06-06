const express = require("express")
const router = express.Router()
const userController = require("../Controllers/user.controller")

//User routes
router.get("/api/user", userController.getAllUsers)
router.get("/api/user/:personeelsnummer", userController.getUserById)
router.get("/api/user/rol/:personeelsnummer", userController.getUserRolByID)
router.get("/api/user/password/:personeelsnummer", userController.getUserPasswordByID)
// router.post("/api/user", userController.createUser)
router.post("/api/login", userController.loginUser)
router.put("/api/user/:personeelsnummer", userController.updateSignature)

// router.post("/api/user/WPI", userController.saveWPI)

module.exports = router