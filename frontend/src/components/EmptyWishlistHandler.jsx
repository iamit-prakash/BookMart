import { Link } from "react-router-dom"
export default function EmptyWishlistHandler(){
  return(
    <div className=" container py-5" >
        <div className="row justify-content-center">
        <div className="col-md-5">
        
        <div className="card text-center p-4">
        <h2 className="mb-3">
            Wishlist is Empty!
            </h2>
        
        <img
        src="https://static.vecteezy.com/system/resources/thumbnails/039/650/548/small/wishlist-icon-in-comic-style-like-document-cartoon-illustration-on-isolated-background-favorite-list-splash-effect-business-concept-vector.jpg"
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