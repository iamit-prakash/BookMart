import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },    
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
}
],
    orderPrice: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["UPI", "Cash", "Netbanking"],
        required: true
    },
}, {timestamps: true})

export const Order = mongoose.model("Order", orderSchema)