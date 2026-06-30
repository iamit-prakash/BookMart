import { Link } from "react-router-dom";

export default function Profile(){
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
      </div>
      </div>
        </div>
        </div>
        </div>
    )
}