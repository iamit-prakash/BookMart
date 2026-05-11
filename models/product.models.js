import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  stock:{
   type: Number
  },
},
 {timestamps: true})

export const Product = mongoose.model("Product", productSchema)