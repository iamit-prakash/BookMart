import { Link } from "react-router-dom"
import successImage from "../assets/success.png"

export default function OrderSuccess(){
    return(
        <div className=" container py-5" >
        <div className="row justify-content-center">
        <div className="col-md-5">
        
        <div className="card text-center p-4">
        <h2 className="mb-3">
            Order Placed Successfully 🎉
            </h2>
        
        <img
        src={successImage}
        alt="order Success"
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
         Continue Shopping
        </Link>
        </div>
        </div>
        </div>
        </div>  
    )
}