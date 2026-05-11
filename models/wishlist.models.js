import mongoose from "mongoose"

const wishlistSchema = new mongoose.Schema({
  wishlistItems: [{
   product: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Product",
               required: true
           },
  }]
}, {timestamps: true})

export const Wishlist = mongoose.model("Wishlist", wishlistSchema)