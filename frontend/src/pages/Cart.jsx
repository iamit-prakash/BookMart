import { Link } from "react-router-dom";
import CartContext from "../contexts/CartContext"
import WishlistContext from "../contexts/WishlistContext"
import { useContext } from "react"
import EmptyCartHandler from "../components/EmptyCartHandler";
import { notifySuccess, notifyError} from "../components/ToastMessage";

export default function Cart(){
const {cart, setCart} = useContext(CartContext)
const {wishlist, setWishlist} = useContext(WishlistContext)

const removeFromCart = (bookId) => {
  const filteredCart = cart.filter((product) => product._id !== bookId)
      setCart(filteredCart)

      notifySuccess("Book removed from cart");
}

const moveToWishList = (bookId) => {
  const selectedBook = cart.find(product => product._id === bookId)
  const alreadyInWishlist = wishlist.find((book) => book._id === bookId)
    if(!alreadyInWishlist){
          setWishlist([...wishlist, selectedBook])
          notifySuccess("Book moved to wishlist");
    }
    setCart(cart.filter(product => product._id !== bookId))
}

const handleIncrement = (bookId) => {
    const increaseQuantity = cart.map((product) => product._id === bookId ?  
    {
      ...product,
      quantity: product.quantity + 1
    } : product
  )
    setCart(increaseQuantity)
}

const handleDecrement = (bookId) => {
   const decreseQuantity = cart.map((product) => product._id === bookId && product.quantity > 1 ?
    {
      ...product,
      quantity: product.quantity - 1
    } 
    : product
  )
   setCart(decreseQuantity)
}

const totalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0)

const deliveryCharge = totalPrice > 500 ? 0 : 40;

const finalAmount = totalPrice + deliveryCharge

const totalSavings = cart.reduce((acc, curr) => 
  acc + ((curr.originalPrice - curr.price) * curr.quantity), 0 )

    return(
        <div className="container py-4">
        <h1 className="text-center"> My Cart({totalItems})</h1> 

        {
          cart.length === 0 ? <EmptyCartHandler/> : (
            <div className="row">
              {/* Left Side Cart Books */}
              <div className="col-md-8">
                {
                  cart?.map((product) => {
                    const discountPercentage = Math.round(
                      (
                        (product.originalPrice - product.price) / 
                        product.originalPrice
                      ) * 100
                    )
                    return (
                      <div className="card mb-4 p-3" key={product._id}>
                      <div className="row align-items-center">
                        {/* Book Image */}
                        <div className="col-md-4 text-center">
                        <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="img-fluid"
                        style={{
                          height: "300px",
                          objectFit: "contain"
                        }}
                         />
                         </div>

                         {/* Book Details */}
                         <div className="col-md-8">
                          <div className="card-body"> 
                            <h2>{product.title}</h2>
                             <p className="text-muted">
                              by {product.author}
                             </p>
                             <h5>
                              ₹{product.price}
                              <span
                               className="text-muted text-decoration-line-through ms-2"
                              >
                                ₹{product.originalPrice}
                              </span>
                              </h5>
                              {/*Discount percentage section */}
                                <p className="text-success">
                                  {discountPercentage}% off
                                </p>
                              
                             {/*Quantity section */}
                            <div className="d-flex align-items-center gap-3 mt-4 mb-4">
                              <h5 className="mb-0">Quantity</h5>

                             <button
                             className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" 
                              style={{
                                 width: "20px",
                                 height: "20px"
                                 }}
                              onClick={() => handleDecrement(product._id)}
                             >
                              -
                              </button>
                             <span
                              style={{
                                fontSize: "24px",
                                fontWeight: "500",
                                minWidth: "20px",
                                textAlign: "center"
                              }}
                             >
                              {product.quantity}
                              </span>
                             <button 
                                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: "20px",
                                   height: "20px"
                                      }}
                             onClick={() => handleIncrement(product._id)}
                             >
                              +
                              </button>
                              </div>

                             <div className="d-flex flex-column gap-2 mt-2">
                             <button className="btn btn-secondary"
                             onClick={() => moveToWishList(product._id)}
                             >
                              Move to Wishlist🤍
                              </button>
                             <button className="btn btn-outline-secondary" 
                             onClick={() => removeFromCart(product._id)}
                             >
                              Remove from Cart🛒
                              </button>
                             </div>

                            </div>
                          </div>

                        </div>
                      </div>
                  );
                })}
                </div>    
                {/* Right Side Price Details */}
            <div className="col-md-4">
              <div className="card p-4">
                <h2 className="text-center mb-4">
                  PRICE DETAILS
                </h2>
                <hr />
               <p>Price: ({totalItems}items): ₹{totalPrice}</p>
               <p>Delevery Charge: 
                {
                  deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`
                }
               </p>
               <hr />
               <h5>Total Amount: ₹{finalAmount}</h5>
               <p className="text-success mt-3">
                 You will save ₹{totalSavings} on this order
               </p>
               <Link
               to="/addresses"
               className="btn btn-primary w-100 mt-3"
               >
                PLACE ORDER
               </Link>
                </div>
                </div>
              </div>
    )
        }
    </div>
    )
}