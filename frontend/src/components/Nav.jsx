import { Link, useLocation } from "react-router-dom"
import CartStatus from "../components/CartStatus"
import WishlistStatus from "./WishlistStatus"
import { useContext } from "react"
import SearchContext from "../contexts/SearchContext"

export default function Nav() {
const {searchTerm, setSearchTerm} = useContext(SearchContext)
//console.log(searchTerm)
const  location = useLocation()
const isBooksPage = location.pathname === "/books";
//console.log(location)

  return (
    <nav
     className="navbar navbar-expand-lg navbar-dark shadow-sm py-3"
     style={{
    backgroundColor: "#2d2d2d"
  }}
    >

      <div className="container-fluid">

        {/* Logo */}
        <Link
          className="navbar-brand fs-1 fw-bold fst-italic text-light"
          to="/"
        >
          📖 BookMart
        </Link>
     <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      >
   <span className="navbar-toggler-icon"></span>
   </button> 

       <div 
       className="collapse navbar-collapse justify-content-between"
        id="navbarContent">

        {/* Navbar Links */}
        <div 
        className="navbar-nav ms-auto d-flex flex-column flex-lg-row align-items-center gap-3 gap-lg-5"
        >

          {/* Books */}
          <Link
            to="/books"
            className="nav-link text-light text-center fw-bold"
          >
            <div>Books</div>
            <div>📚</div>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="nav-link text-light text-center fw-bold position-relative"
          >
            <div>Wishlist</div>
            <div>❤️</div>

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
            >
              <WishlistStatus />
            </span>

          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="nav-link text-light text-center fw-bold position-relative"
          >
            <div>Cart</div>
            <div>🛒</div>

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
            >
              <CartStatus />
            </span>

          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="nav-link text-light text-center fw-bold"
          >
            <div>Profile</div>
            <div>👤</div>
          </Link>

        </div>

        {/* Search Bar */}
        { isBooksPage && <  form
         className="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0"
        >
          <span className="fs-5 me-2">🔍</span>

      <input
      type="search"
      placeholder="Search books..."
      className="form-control"
      style={{
      width: "100%",
      maxWidth: "320px"
      }}
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)
     }
/>
        </form>}
    </div>      

      </div>

    </nav>
   
  )
}