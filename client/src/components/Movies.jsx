import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../static/movies.css'
import Movie from './Movie.jsx'

export default function Movies() {
    const [movies, setMovies] = useState([]);
  
    const fetchMovies = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/movies')
      const data = await response.json()
        setMovies(data);
    }
    useEffect(() => {
        fetchMovies()
      }
    , []);
  
    return (
      <>
        <header>
	    <nav>
          <ul>
            <li><Link to='/'><i className="fas fa-chevron-left back-icon" /></Link></li>
          </ul>
        </nav>
        </header>
        <div className="movies-container">
          {movies.map((movie) => (
            <div className="movies" id={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <Link to={'/movies/movie?id='+ movie.id}>{movie.title}</Link>
            </div>
          ))}
        </div>
      </>
    );
  }
