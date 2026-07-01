import { Link } from "react-router-dom"
export default function BookCard({
    book,
    handleCart,
    handleWishlist
}) {
   //console.log(book)
    return(
        <>
            <div className="col">
               <div className="card h-100 shadow-sm d-flex flex-column">
                <Link
               to={`/books/${book._id}`}
               className="text-decoration-none text-dark text-center pt-3"
               >
                <img
                  src={book.imageUrl}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "250px", width:"100%", objectFit: "contain" }}
                />
                </Link>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <Link
                  to={`/books/${book._id}`}
              className="text-decoration-none text-dark"
                  >
                  <h4
                  className="card-title mt-2 mb-1"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "1.1rem",
                  fontWeight: "bold"
                }}
                   >
                    📖{book.title}
                    </h4>
                    </Link>

                  <h5
                   className="text-muted mb-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "1rem"
              }}
                  >
                    by {book.author}
                    </h5>
                    <div className="mt-auto">
                  <p className="mb-1 fw-semibold fs-5">Price ₹{book.price}</p>
                  <p className="mb-3 text-muted">Rating: {book.rating}</p>

                  <div className="d-flex flex-column gap-2">
                  <button
                   className="btn btn-primary w-100" onClick={() => handleCart(book)}
                   >
                    Add to Cart🛒
                    </button>
                  <button className="btn btn-primary w-100" onClick={() => handleWishlist(book)}>Add to Wishlist</button>
                  </div>
                </div>
              </div>
             </div>
             </div>
        </>
    )
}