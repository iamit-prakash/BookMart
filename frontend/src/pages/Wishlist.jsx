import CartContext from "../contexts/CartContext"
import WishlistContext from "../contexts/WishlistContext"
import { useContext } from "react"
import EmptyWishlistHandler from "../components/EmptyWishlistHandler";
import {notifySuccess, notifyError} from "../components/ToastMessage";

export default function Wishlist(){
const {wishlist, setWishlist} = useContext(WishlistContext)
const {cart, setCart} = useContext(CartContext)

const removeFromWishlist = (bookId) => {
  const updatedWishlist = wishlist.filter((book)=> book._id !== bookId)
    setWishlist(updatedWishlist)
     notifySuccess("Book removed from wishlist");
}

const moveToCart = (bookId) => {
   const selectedBook = wishlist.find(book => book._id === bookId)
    const alreadyInCart = cart.find(book => book._id === bookId)
    
    if(alreadyInCart) {
      // quantity increase
      const updatedCart = cart.map((product) => product._id === bookId ?
       {
        ...product,
        quantity: product.quantity + 1
       } : product
    )
    setCart(updatedCart)    
    } else {
      //new book add
      setCart([...cart, 
        {
          ...selectedBook,
          quantity: 1
        }
      ])
      notifySuccess("Book moved to cart");
    }
    
    // wishlist se remove
    setWishlist(
      wishlist.filter(book => book._id !== bookId)
    );
};

    return(
        <div className="container py-4">
         
         <h1 className="text-center">
            My Wishlist({wishlist.length})
         </h1>

          { wishlist.length === 0 ? <EmptyWishlistHandler /> : (
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
              {wishlist.map((book) => (
                <div className="col" key={book._id}>

                  <div className="card h-100 text-center p-3">

                    {/*book image */}
                    <img 
                       src={book.imageUrl}
                       alt={book.title}
                       className="card-img-top mx-auto"
                       style={{
                        height: "300px",
                        width: "220px",
                        objectFit: "contain"
                       }}
                     />
                    
                    {/* Card Body */}
                    <div className="card-body" >
                        <h4 className="cart-title">
                            {book.title}
                        </h4>
                        <p className="text-muted">
                      by {book.author}
                    </p>
                       <h3>
                      ₹{book.price}
                    </h3>
                    
                     <div className="d-flex flex-column gap-2 mt-4">
                      <button className="btn btn-outline-secondary" onClick={() => removeFromWishlist(book._id)} >
                        Remove from Wishlist 🤍
                      </button>
                    <button className="btn btn-outline-primary"
                    onClick= {() => moveToCart(book._id)}
                    >
                      Move to Cart 🛒
                    </button>
                    </div>

                      </div>  

                    </div>  
                  </div>  
              ))}  
                </div>
          )
          }
          </div>
    )
}
