import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import CartContext from "../contexts/CartContext"
import AddressContext from "../contexts/AddressContext"

export default function Checkout(){
  const navigate = useNavigate()

 const {cart, setCart} = useContext(CartContext)  

 const {addresses, selectedAddress} = useContext(AddressContext)

 // debug logs
 //console.log("Addresses:", addresses)
 //console.log("Selected Address ID:", selectedAddress)

 if(cart.length === 0) {
  return(
    <div className="container text-center mt-5">
      <h5>Your cart is empty 🛒</h5>
      <p> Please add some books before proceeding to checkout.</p>
     <Link
        to="/books"
        className="btn btn-primary mt-3"
      >
        Shop Now
      </Link>
    </div>
  )
 }

 const deliveryAddress = addresses.find(
     (address) => 
        address.id === selectedAddress
 )

   //console.log("Delivery Address:", deliveryAddress)

 const totalPrice = 
 cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

 const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0)

 const deliveryCharge = totalPrice > 500 ? 0 : 40;

 // Safety Check
 if (!deliveryAddress) {
   return (
     <div className="container py-4">
       <h2>No delivery address selected.</h2>
     </div>
   )
 }

 const handleConfirmOrder = () => {
  setCart([])
  navigate("/order-success")
 }

    return(
        <div className="container py-4">
        <div className="row">
          {/*Left side address */ }
          <div className="col-md-8">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
     <h2 className="mb-0">Delivery Address</h2>
     <Link 
     to="/addresses"
     className="btn btn-outline-info"
     >
      Change Address   
     </Link>
     </div>
     <h5>{deliveryAddress.fullName}</h5>
     <p>{deliveryAddress.mobile}</p>
     <p>{deliveryAddress.streetAddress}</p>
     <p>
      {deliveryAddress.city},
      {" "}
      {deliveryAddress.state}
      {" - "}
     {deliveryAddress.pincode}
   </p>
        </div>
        </div>
      
        {/*Order Summary*/}
        <div className="col-md-4">
        <div className="card p-4">
         <h3 className="mb-4">
          Order Summary
          </h3>
          <hr />
         <p>Price ({totalItems} items): ₹{totalPrice} </p>
         <p>Delivery Charges: 
                {
                  deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`
                }
         </p>
         <hr />
         <h5>Total Amount: ₹{totalPrice}</h5>
         <hr />
         <button
         className="btn btn-success text-center mt-4"
         onClick={handleConfirmOrder}
         >
          Confirm Order
          </button>
        </div>
        </div>
       </div>
      </div> 
    )
}