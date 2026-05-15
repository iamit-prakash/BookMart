import express from "express"
import cors from "cors"

import { initializeDatabase } from "./db/db.connect.js"

import {Category} from "./models/category.models.js";
import { Product } from "./models/product.models.js";
import {Address} from "./models/address.models.js";
import {Cart}  from "./models/cart.models.js";
import {Wishlist} from "./models/wishlist.models.js"
import {Order} from "./models/order.models.js"

const app = express ()

app.use(express.json())

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase()

async function readAllCategory(){
    try {
   const allCategory = await Category.find()
   return allCategory;
    } catch (error){
        throw error
    }
}

app.get("/api/categories", async (req, res) => {
    try {
     const allCategory = await  readAllCategory()
     if( allCategory.length >  0){
        res.json( allCategory)
     } else {
        res.status(404).json({error: "categories not found"})
     }
    } catch (error){
        res.status(500).json({error: "Failed to fetch category data."})
    }
})

async function readCategoryById(categoryId){
    try {
  const category = await Category.findById(categoryId)
  return category;
    } catch (error){
        throw error
    }
}

app.get("/api/categories/:categoryId",async  (req, res) => {
    try {
  const category = await readCategoryById(req.params.categoryId)
  if(category) {
    res.json(category)
  } else {
    res.status(500).json({error: "This category not found"})
  }
    } catch (error){
    res.status(500).json({error: "Failed to fetch category by id."})
    }
}) 

async function readByProduct(){
    try { 
        const product = await  Product.find()
         .populate("category")
         
       return product;
    } catch (error){
        throw error
    }
}

app.get("/api/products", async (req, res) => {
    try {
    const product = await readByProduct()
    if(product.length > 0) {
        res.json(product)
    } else {
        res.status(404).json({error: "Product not found."})
    }
    } catch(error){
        res.status(500).json({error: "Failed to fetch product."})
    }
})

async function readProductById(productId){
    try {
    const product = await Product.findById(productId)
    return product;
    } catch (error){
        throw error
    }
}

app.get("/api/products/:productId", async (req, res) => {
    try{
    const product = await  readProductById(req.params.productId) 
    if(product){
        res.json(product)
    } else {
        res.status(404).json({error: "product not found"})
    }
    } catch (error){
     res.status(500).json({error: "Failed to fetch product."})
    }
})

async function readCart() {
    try {
   const cart = await Cart.find()
   return cart;
    } catch (error){
      throw error  
    }
}

app.get("/api/carts", async (req, res)=> {
    try{
     const cart =  await readCart()
     if(cart.length > 0){
        res.json(cart)
     } else {
        res.status(404).json({error: "Cart not found"})
     }
    } catch (error){
        res.status(500).json({error: "Failed to fetch cart."})
    }
})

async function readWishlist(){
    try {
 const wishlist = await Wishlist.find()
   return wishlist;
    }  catch (error){
     throw error
    }
}

app.get("/api/wishlists", async (req, res)=> {
    try {
const wishlist = await  readWishlist()
if(wishlist.length > 0){
    res.json(wishlist)
 } else {
    res.status(404).json({error: "Wishlist not found."})
 }
    } catch (error){
        res.status(500).json({error: "Failed to fetch wishlist."})
    }
})

async function readAddress(){
    try {
  const address = await Address.find()
  return address;
    } catch (error){
        throw error
    }
}

app.get("/api/addresses", async (req, res) => {
    try {
  const address = await readAddress()
  if(address.length > 0){
    res.json(address)
  } else {
    res.status(404).json({error: "Address not found."})
  }
    } catch {
        res.status(500).json({message: "Failed to fetch address"})
    }
})

async function readOrder(){
    try {
   const order = await Order.find()
   return order;
    } catch (error){
        throw error
    }
}

app.get("/api/orders", async (req, res) => {
    try {
 const order = await  readOrder()
 if (order.length > 0){
    res.json(order)
 }else {
    res.status(404).json({error: "order not found."})
 }
    } catch (error){
        res.status(500).json({error: "Failed to fetch order"})
    }
})

//update part code-
async function updateCart(productId, quantity){
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        {
            "cartItems.product": productId
        },
        {
            $set: {
                "cartItems.$.quantity": quantity
            }
        },
        {new: true}
      )
      return updatedCart;
    } catch(error){
        throw error
    }
}

app.post("/api/carts/update", async  (req, res) => {
    try {
  const updatedCart = await updateCart(req.body.productId, req.body.quantity)
  if(updatedCart){
    res.status(201).json({message: "Cart update Successfully"})
  }
    } catch (error){
        res.status(500).json({error: "Failed to update"})
    }
})

async function updateAddress(addressId, updateData){
   try {
  const updatedAddress = await Address.findByIdAndUpdate(addressId, updateData, {new: true})
  return updatedAddress;
   } catch (error){
    throw error
   }
}

app.post("/api/addresses/update/:addressId", async (req, res) => {
    try {
   const updatedAddress = await updateAddress(req.params.addressId, req.body)
   if(updatedAddress){
    res.status(200).json({message: "Address updated successfully.", address: updatedAddress})
   } else {
    res.status(404).json({error: "Address not found."})
   }
    } catch (error){
        res.status(500).json({error: "Failed to update address."})
    }
})

// delete part code-
async function deleteCartItem(productId){
    try {
   const updatedCart = await Cart.findOneAndUpdate(
    {
        "cartItems.product": productId
    },
     {
        $pull: {
            cartItems: {
                product: productId
            }
        }
     },
     {new: true}
   )
        return updatedCart;

    } catch (error){
        throw error
    }
}

app.delete("/api/carts/:productId", async (req, res)=> {
    try {
     const updatedCart = await deleteCartItem(req.params.productId)
     if(updatedCart){
        res.status(200).json({message: "Cart delete Successfully.", cart: updatedCart})
     }
    } catch (error){
     res.status(500).json({error: "Failed to delete cart item."})   
    }
})

async function deleteWishlistItem(productId){
    try {
const updatedWishlist = await  Wishlist.findOneAndUpdate(
    {
    "wishlistItems.product": productId
    },
    {
        $pull: {
           wishlistItems : {
            product: productId
           }
        }
    },
    {new: true}
)
return updatedWishlist;

    } catch (error){
        throw error
    }
}

app.delete("/api/wishlists/:productId", async (req, res) => {
    try {
   const updatedWishlist = await deleteWishlistItem(req.params.productId)
  if(updatedWishlist) {
    res.status(200).json({message: "Wishlist deleted succesfully"})
  }
    } catch (error){
        res.status(500).json({error: "Failed to delete wishlist"})
    }
})

async function deleteAddress(addressId){
  try {
  const deletedAddress = await Address.findByIdAndDelete(addressId)
  return deletedAddress;
  } catch (error){
    throw error
  }
}

app.delete("/api/addresses/:addressId", async (req, res) => {
    try{
 const deletedAddress = await deleteAddress(req.params.addressId)
 if(deletedAddress){
    res.status(200).json({message: "Address deleted successfully."})
 } else {
    res.status(400).json({error: "Address not found."})
 }
    } catch (error){
    res.status(500).json({error: "Failed to delete address"})
    }
})

//post method
async function createCategory(newCategory){
    try {
   const category = new Category(newCategory)
   const savedCategory = await category.save()
   return savedCategory;
    } catch (error){
        throw error
    }
}

app.post("/api/categories", async (req, res) => {
    try {
  const savedCategory = await createCategory(req.body)
  res.status(201).json({message: "Category added successfully", category: savedCategory})
    } catch (error){
        res.status(500).json({error: "Failed to add category"})
    }
})

async function createProduct(productsData){
    try {
   const savedProduct = await Product.insertMany(productsData)
   return savedProduct;
    } catch (error){
        throw error
    }
}

app.post("/api/products", async (req, res) => {
    try {
  const savedProduct = await createProduct(req.body)
  res.status(201).json({message: "Product added successfully", product: savedProduct})
    } catch (error){
        res.status(500).json({error: "Failed to add product"})
    }
})

async function createCart(newCart){
    try {
   const cart = new Cart(newCart)
   const savedCart = await cart.save()
   return savedCart;
    } catch (error){
        throw error
    }
}

app.post("/api/carts", async (req, res) => {
    try {
  const savedCart = await createCart(req.body)
  res.status(201).json({message: "Cart added successfully", cart: savedCart})
    } catch (error){
        res.status(500).json({error: "Failed to add cart"})
    }
})

async function createWishlist(newWishlist){
    try {
   const wishlist = new Wishlist(newWishlist)
   const savedWishlist = await wishlist.save()
   return savedWishlist;
    } catch (error){
        throw error
    }
}

app.post("/api/wishlists", async (req, res) => {
    try {
  const savedWishlist = await createWishlist(req.body)
  res.status(201).json({message: "Wishlist added successfully", wishlist: savedWishlist})
    } catch (error){
        res.status(500).json({error: "Failed to add wishlist"})
    }
})

async function createAddress(newAddress){
    try {
   const address = new Address(newAddress)
   const savedAddress = await address.save()
   return savedAddress;
    } catch (error){
        throw error
    }
}

app.post("/api/addresses", async (req, res) => {
    try {
  const savedAddress = await createAddress(req.body)
  res.status(201).json({message: "Address added successfully", address: savedAddress})
    } catch (error){
        res.status(500).json({error: "Failed to add address."})
    }
})

async function createOrder(newOrder){
    try {
   const order = new Order(newOrder)
   const savedOrder = await order.save()
   return savedOrder;
    } catch (error){
        throw error
    }
}

app.post("/api/orders", async (req, res) => {
    try {
  const savedOrder = await createOrder(req.body)
  res.status(201).json({message: "Order added successfully", order: savedOrder})
    } catch (error){
        res.status(500).json({error: "Failed to add order."})
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`)
})