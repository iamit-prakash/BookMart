import { Link } from "react-router-dom"

export default function EmptyCartHandler(){
   return(
    <div className=" container py-5" >
        <div className="row justify-content-center">
        <div className="col-md-5">
        
        <div className="card text-center p-4">
        <h2 className="mb-3">
            Cart is Empty!
            </h2>
        
        <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-fc3XEuMAQ57mM_zS9mZV5WMDuNaeGvOyKWYUzZ2PA&s=10"
        alt="empty Cart"
        className="img-fluid mx-auto"
        style={{
            maxHeight: "300px",
            objectFit: "contain"
        }}
         />

        <Link
        to="/books"
        className="btn btn-primary mt-3"
        >
       Shop Now
        </Link>
        </div>
        </div>
        </div>
        </div>  
   )
}