import { Link, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useFetch from "../useFetch"
import FilterPanel from "./FilterPanel"
import BookCard from "../components/BookCard"
import CartContext from "../contexts/CartContext"
import WishlistContext from "../contexts/WishlistContext"
import { useContext } from "react"
import {notifySuccess, notifyError} from "../components/ToastMessage"
import SearchContext from "../contexts/SearchContext"

export default function Books(){
  const[category, setCategory] = useState([])
  const[rating, setRating] = useState(0)
  const[sortByPrice, setSortByPrice] = useState("default")
  //console.log(sortByPrice)
  const[searchParams] = useSearchParams()
  
 const {data, error, loading} = useFetch("https://book-mart-cyan.vercel.app/api/products", []) 

 const {cart, setCart} = useContext(CartContext) 
 const {wishlist, setWishlist} = useContext(WishlistContext)
 const {searchTerm} = useContext(SearchContext)
 //console.log(searchTerm)
 
 const selectedCategory = searchParams.get("category")
  //console.log(selectedCategory)

  useEffect(()=> {
    if(selectedCategory){
      setCategory([selectedCategory])
    }
  }, [selectedCategory])


 if (loading) return <h3 className="text-center mt-5 text-light">Loading...</h3>
  if (error) return <h2 className="text-center mt-5 text-danger">Error...</h2>

const handleCategory = (event) => {
   //console.log(event.target.value, event.target.checked)
   if(event.target.checked){
      setCategory([...category, event.target.value])
   } else {
    setCategory(category.filter((book) => book !== event.target.value))
   }
}

const categoryFilteredBooks = category.length > 0

? data.filter((book) => {
    //console.log(book.category)
    return category.includes(
      book.category.category
    )
})

: data

// console.log("data:", data)
// console.log("category:", category)
// console.log("categoryFilteredBooks:", categoryFilteredBooks)

const filteredBooks = categoryFilteredBooks.filter(
  (book) => book.rating >= rating
)

const searchedBooks = filteredBooks.filter((book) =>
  book.title.toLowerCase().includes(searchTerm.toLowerCase())
)

const sortedBooks = [...searchedBooks ];

if(sortByPrice === "lowToHigh"){
  sortedBooks.sort((a,b) => a.price - b.price)
}

if(sortByPrice === "highToLow"){
  sortedBooks.sort((a,b) => b.price - a.price)
}

const handleClearFilters = () => {
  setCategory([]),
    setRating(0),
    setSortByPrice("default")

}

const handleCart = (item) => {
  const alreadyExists = cart.find((book)=> book._id === item._id)

  if(!alreadyExists){
    setCart([...cart, 
      {
        ...item,
        quantity: 1
      }
    ])
    
    notifySuccess("Book added to cart")
  } else {
     notifyError(
    "Book already added. Check cart."
  )
  }
}

const handleWishlist =(item) => {
  const alreadyExists = wishlist.find((book) => book._id === item._id)

  if(!alreadyExists){
    setWishlist([...wishlist, 
      {...item,
        quantity: 1
      }
      ])

    notifySuccess("Book added to wishlist")
  }  else {
    notifyError(
    "Book already added. Check wishlist."
  )
  }
}

    return(
    <div className="container">
  <div className="row">

  <FilterPanel
    category={category}
    handleCategory={handleCategory}
    rating={rating}
    setRating={setRating}
    sortByPrice={sortByPrice}
    setSortByPrice={setSortByPrice}
    handleClearFilters={handleClearFilters}
    
   />
         {/*Product data */}
         <div className="col-md-9 mt-4">
          <p className="mt-3">
           Showing {sortedBooks.length} books
         </p> 
       <div className="row row-cols-1 row-cols-md-3 g-4">
       {sortedBooks.map((book) => (
       <BookCard
        key={book._id}
        book={book}
        handleCart={handleCart}
       handleWishlist={handleWishlist}
        />
))}
          </div>
          </div>

  </div>
</div> 
    )
}
