import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Nav from "./components/Nav"
import Books from "./pages/Books"
import Wishlist from "./pages/Wishlist"
import Profile from "./pages/Profile"

export default function App(){
  return (
    <>
   <Router>
    <Nav />
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/books" element={<Books />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/profile" element={<Profile />} />
    </Routes>
   </Router>
   </>
  )
}