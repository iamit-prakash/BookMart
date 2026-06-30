import {Link} from "react-router-dom"
import useFetch from "../useFetch"
import Footer from "../components/Footer"

export default function Home(){
  const {data, loading, error}  = useFetch("https://book-mart-cyan.vercel.app/api/categories")
  //console.log(data)
  if (loading) return <h3 className="text-center mt-5 text-light">Loading...</h3>
  if (error) return <h2 className="text-center mt-5 text-danger">Error...</h2>
   return( 
     <main className="container py-5">
      
      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ color: "#FBBF24" }}> {/* Golden Yellow color */}
          Welcome to BookMart
        </h1>
        
  <figure className="text-center">
  <blockquote className="blockquote">
    <p className="fst-italic">A room without books is like a body without a soul.</p>
  </blockquote>
  <figcaption className="blockquote-footer" style={{ color: "yellowgreen" }}>
    Marcus Tullius Cicero
  </figcaption>
  </figure>
      </div>

      {/*  CATEGORIES GRID */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {data?.map((book) => (
          <div className="col" key={book._id}>
            <Link to={`/books?category=${book.category}`} className="text-decoration-none">
              <div className="card h-100 bg-dark text-light border-secondary shadow">
                <img
                  src={book.imgUrl}
                  className="card-img-top p-3"
                  alt={book.category}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body text-center border-top border-secondary">
                  <h5 className="m-0">📖 {book.category} Books</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* 📔 ALL BOOKS CARD */}
        <div className="col">
          <Link to="/books" className="text-decoration-none">
            <div className="card h-100 bg-dark text-light border-secondary shadow">
              <img
                src="https://res.cloudinary.com/duvprtaji/image/upload/v1782756275/All_Categories__Book_tljqa8.png"
                className="card-img-top p-3"
                alt="All Books"
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body text-center border-top border-secondary">
                <h5 className="m-0">📔 All Books... 📖</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    
     </main>
   )
}