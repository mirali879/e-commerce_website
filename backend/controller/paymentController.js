const Stripe = require("../utils/setup");
const productModel = require("../models/productModel");



class PaymentController {


    constructor() {
        this.handlePayment = this.handlePayment.bind(this)
    }

      async getProductAmount(carts) {
          let totalAmount = 0;
        try {
            for (const cart of carts) {
                const product = await productModel.findById(cart._id);
                totalAmount += product.price * cart.cartQuantity;
            }
            return totalAmount;
        } catch (error) {
            throw Error(error.message)
        }
    }

    async handlePayment(req, res) {
        try {

            const { cart ,user } = req.body;
        
            const totalAmount = await this.getProductAmount(cart)
        
            const paymentIntent = await Stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: "usd",
            metadata: {
                ...user,
            },
            automatic_payment_methods: {
                 enabled: true,
            },
            });
            res.status(200).json({message:paymentIntent.client_secret,success:true})
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }

}




module.exports = new PaymentController()