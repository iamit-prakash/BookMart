import { useParams } from "react-router-dom"
import useFetch from "../useFetch"
import CartContext from "../contexts/CartContext"
import WishlistContext from "../contexts/WishlistContext"
import { useContext, useState } from "react"

export default function BookDetails(){
 const {bookId} = useParams() 
 //console.log(bookId)
 const { data, loading, error} = useFetch("https://book-mart-cyan.vercel.app/api/products",
  [])
const{cart, setCart} = useContext(CartContext)
const{wishlist, setWishlist} = useContext(WishlistContext)

  const selectedBook = data.find((book) => book._id === bookId)
  console.log(selectedBook)

   if(loading) return <p>Loading...</p>
   if(error) return <p>Error...</p>;

   if(!selectedBook) {
  return <h2>Book not found.</h2>;
}

 const discountPercentage = Math.round(

    (
     (selectedBook.originalPrice - selectedBook.price) /
     selectedBook.originalPrice
    )  * 100
 )  

 const handleCart = () => {
  const alreadyExists = cart.find(
    (book) => book._id === selectedBook._id
  );

  if (!alreadyExists) {
    setCart([
      ...cart,
      {
        ...selectedBook,
        quantity: 1
      }
    ]);

    notifySuccess("Book added to cart");
  } else {
    notifyError("Book already added. Check cart.");
  }
};

const handleWishlist = () => {
  const alreadyExists = wishlist.find(
    (book) => book._id === selectedBook._id
  );

  if (!alreadyExists) {
    setWishlist([
      ...wishlist,
      {
        ...selectedBook,
        quantity: 1
      }
    ]);

    notifySuccess("Book added to wishlist");
  } else {
    notifyError("Book already added. Check wishlist.");
  }
};

    return(
        <div className="container py-4">
        <div className="row">
            {/*Left side img */}
            <div className="col-md-5">
            <img
            src={selectedBook.imageUrl}
            alt={selectedBook.title}
            className="img-fluid"
            style={{
                height:"500px",
                objectFit: "contain"
            }}
             />   
            </div>
          {/*Book details */}
          <div className="col-md-7">
        <h2>{selectedBook.title}</h2>
        <p  style={{color:"yellow"}}>
         by {selectedBook.author}
        </p>
        <h5>
         ⭐ {selectedBook.rating}   
        </h5>
        <h3>
        ₹{selectedBook.price}    
        </h3>
        <span
        className="text-decoration-line-through ms-2"
        >
        ₹{selectedBook.originalPrice}
        </span>
        <p className="text-success">
        {discountPercentage}% OFF
        </p>

        <p>
        <strong>Description: </strong>
         {selectedBook.description}  
        </p>
        <p className="text-success">
  🚚 Free Delivery on orders above ₹500
      </p>
        <p>
        <strong>Category: </strong>
        {selectedBook.category.category}
        </p>
        <button
         className="btn btn-light w-100"
           onClick={handleCart}
         >
          Add to Cart 🛒
        </button>

   <button
    className="btn btn-secondary w-100 mt-3"
    onClick={handleWishlist}
    >
    Add to Wishlist 🤍
   </button>
          </div>
        </div>
        </div>
    )
}