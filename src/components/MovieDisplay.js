import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Dna } from "react-loader-spinner"

const MovieDisplay = () => {

    const [movies,setMovies] = useState([])
    const [search,setSearch] = useState('')
    const [loading,setLoading] = useState(false)
    const api_url = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;


    const searchMovies = async (title)=>{
        setLoading(true)
        const response = await fetch(`${api_url}&s=${title}`)
        const data = await response.json()
        setLoading(false)
        setMovies(data.Search)
    } 

    return ( 
        <>
        <div className="searchbar">
            <input type="text" placeholder="Enter Movie Name" onChange={(e)=>setSearch(e.target.value)}/>
            <button title="Search" onClick={()=>searchMovies(search)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
        {loading ? 
        <div className="loader">
            <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            />
        </div>
        :
        ""}
        {movies ?
            <div className="movie-container">{movies && movies.map((movie)=>{
                return (
                    <div className="single-movie">
                        <img src={movie.Poster !== "N/A" ? movie.Poster:"images/img-not-available.jpg"} alt="" />
                        <p className="movie-type">{movie.Type}</p>
                        <div className="movie-title">{movie.Title}</div>
                        <p className="imdb-link"><a target="_blank" href={`https://www.imdb.com/title/${movie.imdbID}`}>See more info</a></p>
                        <p className="movie-year">{movie.Year}</p>
                    </div>
                    )
            })}</div>
            :
            <h2 className="noMovies">No Movies Found!</h2>
        }
        
        </>
     );
}
 
export default MovieDisplay;