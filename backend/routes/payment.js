const { handlePayment } = require("../controller/paymentController")

const router = require("express").Router()

router.post("/create-payment-intent",handlePayment)



module.exports = router

