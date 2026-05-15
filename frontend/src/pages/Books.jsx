import { useState } from "react"
import useFetch from "../useFetch"

export default function Books(){
  const[category, setCategory] = useState([])
 const {data, error, loading} = useFetch("https://book-mart-cyan.vercel.app/api/products") 
 
 if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>



const handleCategory = (event) => {
   //console.log(event.target.value, event.target.checked)
   if(event.target.checked){
      setCategory([...category, event.target.value])
   } else {
    setCategory(category.filter((book) => book !== event.target.value))
   }
}

const filteredBooks = category.length > 0

? data.filter((book) => {

    console.log(book.category)

    return category.includes(
      book.category.category
    )

})

: data
    return(
    <div className="container">
  <div className="row">

    {/* Filter Section */}
<div className="col-md-3">

  <div className="card p-3">

    <h2>Filters</h2>
    <br />
    <h5>Category📙📘📗</h5>
    <label htmlFor="Self Help"> 
    <input onChange={handleCategory} type="checkbox" id="Self Help" value="Self Help" /> Self Help
    </label>
    <label htmlFor="Business"> 
    <input onChange={handleCategory} type="checkbox" id="Business" value="Business" /> Business
    </label>
    <label htmlFor="Finance"> 
    <input onChange={handleCategory} type="checkbox" id="Finance" value="Finance" /> Finance
    </label>
    <label htmlFor="Productivity"> 
    <input onChange={handleCategory} type="checkbox" id="Productivity" value="Productivity" /> Productivity
    </label>
</div>
</div>

         <div className="col-md-9">
       <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredBooks?.map((book) => (
            <div className="col" key={book._id}>
               <div className="card h-100">
                <img
                  src={book.imageUrl}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "250px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <h5>📖{book.title}</h5>
                  <p>Price ₹{book.price}</p>
                  <p>Rating: {book.rating}</p>
                  <div className="d-flex flex-column gap-2">
                  <button className="btn btn-primary">Add to Cart🛒</button>

                  <button className="btn btn-primary">Add to Wishlist</button>
                  </div>
                </div>
              </div>
              </div>
          ))}
          </div>
          </div>

  </div>
</div> 
    )
}