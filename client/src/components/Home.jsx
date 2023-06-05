import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../static/home.css'
export default function Home () {
  const [movies, setMovies] = useState([])
  const fetchMovies = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/movies/display')
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
        <div className='nav-bar'>
          <p><Link to='/login'>Login</Link></p>
          <p><Link to='/register'>Register</Link></p>
        </div>
      </header>
      <div className='hero'>
        <h1>
          Welcome. Book Your Tickets with Cinemate!
        </h1>
      </div>
     <div className='popular'> 
	  <div className='description'>
	  <p><strong>Whats popular?</strong> <input type="text" placeholder="Search movies by genre" /></p>
	  </div>
     <div className="home-container">
          {movies.map((movie) => (
            <div className="movies" id={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <Link to={'/movies/movie?id='+ movie.id}>{movie.title}</Link>
            </div>
          ))}
        </div> 
      </div>
    </>
  );
}
