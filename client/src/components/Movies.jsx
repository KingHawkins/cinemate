import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../static/movies.css'
import Movie from './Movie.jsx'

export default function Movies() {
    const [movies, setMovies] = useState([]);
  
    const fetchMovies = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/movies')
      const data = await response.json()
        console.log(data)
        setMovies(data);
    }
    useEffect(() => {
        fetchMovies()
      }
    , []);
  
    return (
      <>
        <header>
	    {/* <input type="text" name="movies" id="movies" placeholder="Search movies by genre" />*/}
	    {/*<div className="overlay"></div>*/}
	    {/*<div className="nav-bar">*/}
	    {/*<p><Link to="/login">Login</Link></p>*/}
	    {/*<p><Link to="/register">Register</Link></p>*/}
	    {/*</div>*/}
        </header>
        <div className="movies-container">
          {movies.map((movie) => (
            <div className="movies" id={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <Link to={'/movies/movie-info?id='+ movie.id}>{movie.title}</Link>
            </div>
          ))}
        </div>
      </>
    );
  }
