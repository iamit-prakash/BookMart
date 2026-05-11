import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            default: 1,
            type: Number,
            required: true
        }

    }]
 
}, {timestamps: true})

export const Cart = mongoose.model("Cart", cartSchema)