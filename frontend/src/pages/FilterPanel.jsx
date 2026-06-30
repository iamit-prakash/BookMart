
export default function FilterPanel({
    category,
    handleCategory,
    rating,
    setRating,
    sortByPrice,
    setSortByPrice,
    handleClearFilters,
}) 

 {
    // console.log(category)
    // console.log(handleCategory)
    // console.log(rating);
    // console.log(setRating);
    // console.log(sortByPrice);
    // console.log(setSortByPrice);

    return(
        <>
        {/* Filter Section */}
<div className=" col-md-3">
  <div className=" container py-4 mt-4 card p-3">
    <h2>Filters</h2>
    <br />
    <h5>Category📙📘📗</h5>
    <label htmlFor="Self Help"> 
    <input 
    onChange={handleCategory} 
    type="checkbox" 
    id="Self Help" 
    value="Self Help"
    checked={category.includes("Self Help")} 
     /> Self Help
    </label>
    <label htmlFor="Business"> 
    <input 
    onChange={handleCategory} 
    type="checkbox" 
    id="Business" 
    value="Business"
    checked={category.includes("Business")}
    /> Business
    </label>
    <label htmlFor="Finance"> 
    <input 
    onChange={handleCategory} 
    type="checkbox" 
    id="Finance" 
    value="Finance"
    checked={category.includes("Finance")}
    /> Finance
    </label>
    <label htmlFor="Productivity"> 
    <input 
    onChange={handleCategory} 
    type="checkbox" 
    id="Productivity" 
    value="Productivity"
    checked={category.includes("Productivity")}
    /> Productivity
    </label>

    <h5 className="mt-4">Rating</h5>
    <p className="text-muted">{rating} & Above</p>
    <input
    type="range"
    min="0"
    max="4"
    step="0.5"
    value={rating}
    onChange={(e)=> setRating(Number(e.target.value))}
    className="form-range"
     />

<h5 className="mt-4">Sort Books by Price</h5>

<div className="form-check">
<input
className="form-check-input"
type="radio"
name="sortPrice"
value="default"
checked={sortByPrice === "default"}
onChange={(e) => setSortByPrice(e.target.value)}
 />
 <label className="form-check-label">
  Price - Default
 </label>
</div>

<div className="form-check">
<input
className="form-check-input"
type="radio"
name="sortPrice"
value="lowToHigh"
checked={sortByPrice === "lowToHigh"}
onChange={(e) => setSortByPrice(e.target.value)}
 />
 <label className="form-check-label">
  Price - Low to High
 </label>
</div>

<div className="form-check">
<input
className="form-check-input"
type="radio"
name="sortPrice"
value="highToLow"
checked={sortByPrice === "highToLow"}
onChange={(e) => setSortByPrice(e.target.value)}
 />
 <label className="form-check-label">
  Price - High to Low
 </label>
</div>
<button className="btn btn-primary mt-4"
 onClick={handleClearFilters}
>
  Clear All
  </button>
</div>
</div>
        </>
    )
}