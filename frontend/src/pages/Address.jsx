import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AddressContext from "../contexts/AddressContext";
import { useState } from "react";
import {notifySuccess, notifyError} from "../components/ToastMessage"

export default function Address(){
const navigate = useNavigate()

   const {
    addresses, 
    setAddresses,
    selectedAddress, 
    setSelectedAddress
          } = useContext(AddressContext)

   const [editingId, setEditingId] = useState(null)
   
   const[formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    streetAddress: "",
   });

   const handleChange = (e) => {
    const {name, value}= e.target;

    setFormData({
        ...formData,
        [name]: value
    })
   }

   const handleSubmit = (e) => {
     e.preventDefault()

     if(editingId !== null){
       const updatedAddresses = 
       addresses.map((address) =>
        
        address.id === editingId 
        ? {
            ...formData,
            id: editingId
        }
        : address
    )

    setAddresses(updatedAddresses)

     } else {
         setAddresses([
            ...addresses,
            {
             id: Date.now(),
             ...formData
            }
         ])
     }
     
    setFormData({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    streetAddress: ""
   })

   setEditingId(null)
   }

   const handleDelete = (id) => {
    const updatedAddresses = 
      addresses.filter((address) => address.id !== id)

      setAddresses(updatedAddresses)
   }

   const handleEdit = (id) => {
    const selectedAddress = 
    addresses.find(
        (address) => address.id === id
    )
    setFormData(selectedAddress)
    setEditingId(id)
   }

   const handleCheckout = () => {
    if(selectedAddress === null){
      notifyError("Please select Address");
      return;
    }
    navigate("/checkout")
   }

   return(
        <div className="card p-4 mt-4">
     <h3>Add New Address:</h3>
     <form onSubmit={handleSubmit}>
     <input
     className="form-control mb-3"
     placeholder="Full Name"
     name="fullName"
     value={formData.fullName}
     onChange={handleChange}
     required
      />

      <input
     className="form-control mb-3"
     placeholder="Mobile Number"
     name="mobile"
     value={formData.mobile}
     onChange={handleChange}
     required
      />

      <input
     className="form-control mb-3"
     placeholder="City"
     name="city"
     value={formData.city}
     onChange={handleChange}
     required
      />
     
      <input
     className="form-control mb-3"
     placeholder="State"
     name="state"
     value={formData.state}
     onChange={handleChange}
     required
      />

      <input
     className="form-control mb-3"
     placeholder="Pincode"
     name="pincode"
     value={formData.pincode}
     onChange={handleChange}
     required
      />

      <input
     className="form-control mb-3"
     placeholder="Street Address"
     name="streetAddress"
     value={formData.streetAddress}
     onChange={handleChange}
     required
      />

       <button 
      type="submit"
      className="btn btn-success"
      >
        {
          editingId !== null
          ? "Updated Address"
          : "Add Address"
        }
      </button>
      </form>
      
      <hr className="my-5" />

      <h3>Saved Address</h3>

      {
        addresses.map((address) => (
            <div 
                className="card p-3 mt-3"
                key={address.id}
                >

            <h5>{address.fullName}</h5>

            <p>{address.mobile}</p>

            <p>{address.streetAddress}</p>

            <p>
                {address.city},
                {" "}
                {address.state}
                {" - "}
                {address.pincode}
            </p>
           
           <div className="d-flex gap-2 mt-4">
            <button
               className="btn btn-outline-danger"
               onClick={() => handleDelete(address.id)}
            >
                Delete
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => handleEdit(address.id)}
            >
               Edit
            </button>
            </div>

            <div className="d-flex gap-2 mt-4">
             <button 
             className={
              selectedAddress === address.id 
              ? "btn btn-success"
              : "btn btn-outline-success"
             }
            
             onClick={() => 
               setSelectedAddress(address.id)
             }

             >
              {
              selectedAddress === address.id
              ? "✓ Selected"
              : "Select Address"
              }
              </button>
             </div>
                </div>
                
        ))
      }
      {/*For button in center */}
      <div className="text-center mt-4">
      <button
       className="btn btn-success"
       onClick={handleCheckout}
      >
        Proceed To Checkout
      </button>
      </div>
    </div>
   )
}