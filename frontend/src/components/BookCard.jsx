import { Link } from "react-router-dom"
export default function BookCard({
    book,
    handleCart,
    handleWishlist
}) {
   console.log(book)
    return(
        <>
            <div className="col">
               <div className="card h-100">
                <Link
               to={`/books/${book._id}`}
               className="text-decoration-none text-dark"
               >
                <img
                  src={book.imageUrl}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h4>📖{book.title}</h4>
                  </div>
                  </Link>
                  <div className="card-body pt-0">
                  <h5>by {book.author}</h5>
                  <p>Price ₹{book.price}</p>
                  <p>Rating: {book.rating}</p>
                  <div className="d-flex flex-column gap-2">
                  <button
                   className="btn btn-primary" onClick={() => handleCart(book)}
                   >
                    Add to Cart🛒
                    </button>
                  <button className="btn btn-primary" onClick={() => handleWishlist(book)}>Add to Wishlist</button>
                  </div>
                </div>
              </div>
              </div>
        </>
    )
}