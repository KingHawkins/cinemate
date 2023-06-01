import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import '../static/movie-info.css'

export default function Movie(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [movie, setMovie] = useState([])
    const fetchMovie = async (id) => {
	try{
	    const response = await fetch(`http://127.0.0.1:5000/api/movies/${id}`)
	    const data = await response.json()
	    setMovie(data)
	} catch(err){
	    console.error(err)
	}
    }
    useEffect(() => {
       fetchMovie(id)
    }, [id])
    return (
	<>
	    <div className="movie-info">
              <div className="movie" id={movie.id} style={{
		      backgroundImage: `url(${movie.poster_url})`
	      }}>
	    <img src={movie.poster_url} width="150vw"alt={movie.title}/>
	        <div className="description">
	           <h1>{movie.title}</h1>
	           <button onClick={() => {document.querySelector("iframe").style["z-index"] ="3"}}>Play Trailer</button>
		   <p>{movie.overview}</p>
	        </div>
	        <div className="movie-overlay"></div>
              </div>
	    </div>
	    <iframe width="300" height="200" src={movie.trailer_url} frameBorder="0" allowFullScreen></iframe>

	</>
    )
}
