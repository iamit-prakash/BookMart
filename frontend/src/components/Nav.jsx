import { Link } from "react-router-dom"

export default function Nav() {

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-3">

      <div className="container-fluid">

        {/* Logo */}
        <Link
          className="navbar-brand fs-1 fw-bold fst-italic"
          to="/"
        >
          📖 BookMart
        </Link>

        {/* Navbar Links */}
        <div className="d-flex align-items-center gap-5">

          {/* Books */}
          <Link
            to="/books"
            className="text-decoration-none text-dark text-center fw-bold"
          >
            <div>Books</div>
            <div>📚</div>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="text-decoration-none text-dark text-center fw-bold position-relative"
          >
            <div>Wishlist</div>
            <div>❤️</div>

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
            >
              0
            </span>

          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-decoration-none text-dark text-center fw-bold position-relative"
          >
            <div>Cart</div>
            <div>🛒</div>

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
            >
              0
            </span>

          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="text-decoration-none text-dark text-center fw-bold"
          >
            <div>Profile</div>
            <div>👤</div>
          </Link>

        </div>

        {/* Search Bar */}
        <form className="d-flex align-items-center">

          <span className="fs-5 me-2">🔍</span>

          <input
            type="search"
            placeholder="Search books..."
            className="form-control"
            style={{ width: "320px" }}
          />

        </form>

      </div>

    </nav>

  )
}