import { useContext } from "react";
import { Link } from "react-router-dom";
import OrderContext from "../contexts/OrderContext";

export default function Profile(){
 const {orders}  = useContext(OrderContext)
 //console.log(orders)

    return(
        <div className="container py-5">
       <div className="row justify-content-center">
        <div className="col-md-8">
        <div className="card shadow p-5">
      
      {/* Profile Icon */}
      <div className="text-center">
        <i
         className="bi bi-person-bounding-box"
         style={{
           fontSize: "50px"
         }}
        >
        </i>
      <h2 className="mt-3">
        User Profile
        </h2>
      </div>

      <hr className="my-4" />

      {/*User Details */}
      <div className="mb-4">
      <p className="mb-0"><strong>Name:</strong> John  </p>
      </div>
      
      <div className="mb-3">
      <p className="mb-0"><strong>Email:</strong> jhon@gmail.com </p>
      </div>

      <div className="mb-3">
      <p className="mb-0"><strong>Phone:</strong>  8845347865</p>
      </div>

    <div className="d-grid gap-2 mt-4">
      <Link
      to="/addresses"
      className="btn btn-primary"
      >
        Manage Addresses 📍
      </Link>
      <hr className="my-4" />
      <h3 className="mb-3">
        📦 Order History
      </h3>

     {
      orders.length === 0 ? (
        <p>No order placed yet.</p>
      ) :(
        <div>
          {orders.map((order)=> (
            <div
            key={order._id}
            className="card p-3 mb-3"
            >
              <div className="mb-3">
                <div className="d-flex justify-content-between">
            <strong>Order Date:</strong><span>{order.orderDate}</span>
            </div> 

              <div className="d-flex justify-content-between">
            <strong>Total Items:</strong><span>{order.totalItems}</span>
            </div> 

              <div className="d-flex justify-content-between">
            <strong>Total Amount:</strong><span>₹{order.totalAmount}</span>
            </div> 
</div>
<hr />
            <h6 className="mt-3 mb-2">
              Ordered Books
            </h6>
            {order.books.map((book) => (
              <div 
              key={book._id}
              className="d-flex align-items-center gap-3 mb-3"
              >
              <img
              src={book.imageUrl}
              alt={book.title}
              style={{
                width: "70px",
                height: "90px",
                objectFit: "contain"
              }}
               />
               <div className="mb-1">
                <h6 className="mb-1">
                  {book.title}
                </h6>

                <p className="mb-1 text-muted">
                  by {book.author}
                </p>
                <p className="mb-0">
                 Quantity: {book.quantity}
               </p>
                </div>
                </div>
            ))

            }
              </div> 
          ))
          }
          </div>
      )
     }
      </div>
      </div>
        </div>
        </div>
        </div>
    )
}