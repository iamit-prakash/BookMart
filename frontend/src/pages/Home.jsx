
import useFetch from "../useFetch"
import Footer from "../components/Footer"

export default function Home(){
  const {data, loading, error}  = useFetch("https://book-mart-cyan.vercel.app/api/categories")
  //console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
   return( 
     <main className="container py-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
          {data?.map((book) => (
            <div className="col" key={book._id}>
               <div className="card h-100">
                <img
                  src={book.imgUrl}
                  className="card-img-top"
                  alt={book.category}
                  style={{ height: "250px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <h5>📖{book.category} Categories Books</h5>
                </div>
              </div>
              </div>
          ))}
          </div>
          <Footer />
     </main>
   )
}