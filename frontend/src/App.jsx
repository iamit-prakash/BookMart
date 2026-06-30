import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Nav from "./components/Nav"
import Books from "./pages/Books"
import Wishlist from "./pages/Wishlist"
import Address from "./pages/Address"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import BookDetails from "./pages/BookDetails"
import CartContext from "./contexts/CartContext"
import WishlistContext from "./contexts/WishlistContext"
import AddressContext from "./contexts/AddressContext"
import SearchContext from "./contexts/SearchContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import OrderSuccess from "./pages/OrderSuccess"


export default function App(){
  const[cart, setCart] = useState(()=> {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  const[wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })


  const[addresses, setAddresses] = useState(()=> {
    const savedAddresses = localStorage.getItem("addresses")
    return savedAddresses
    ? JSON.parse(savedAddresses)
    : []
  })
  const[selectedAddress, setSelectedAddress] = useState(null)

  const[searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )
  }, [cart])

  useEffect(()=> {
    localStorage.setItem(
      "wishlist", 
      JSON.stringify(wishlist)
    )
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses))
  }, [addresses])

  return (
    <>
  <AddressContext.Provider
   value={{addresses, setAddresses, selectedAddress, setSelectedAddress}}>
  <WishlistContext.Provider value={{wishlist, setWishlist }} >
  <CartContext.Provider value={{cart, setCart}}>
    <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
   <Router>
    <Nav />
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/books" element={<Books />} />
     <Route path="/books/:bookId" element={<BookDetails />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/wishlist" element={<Wishlist />} />
     <Route path="/addresses" element={<Address />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
   </Router>

     <ToastContainer
      position="top-right"
      autoClose={3000}
    />
    </SearchContext.Provider>
   </CartContext.Provider>
   </WishlistContext.Provider>
   </AddressContext.Provider>
   </>
  )
}