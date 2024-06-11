const express = require("express")
const router = express.Router()
const orderController = require("../Controllers/order.controller")

router.get("/api/order", orderController.getOrders)

module.exports = router