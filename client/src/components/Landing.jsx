import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../static/landing.css';
import Footer from './Footer';

export default function Landing() {
  const [movies, setMovies] = useState([])
  const fetchMovies = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/movies/display')
      const data = await response.json()
        setMovies(data);
    }
    useEffect(() => {
        fetchMovies()
	if (localStorage.getItem('access_token')){
		document.querySelector('.dashboard').style['visibility'] = 'visible'
	}
      }
    , []);
  return (
    <>
    <div className="landing">
      <header>
        <div className="logo">Cinemate</div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
	    <li style={{ visibility: 'hidden'}} className='dashboard'><Link to='/dashboard'><i className="fas fa-user-circle user-icon"/></Link></li>
          </ul>
        </nav>
      </header>

      <div className="hero">
	<div className='hero-overlay'></div>
        <h1 style={{ color: '#fff'}}>Discover the Magic of Cinema</h1>
        <p>Explore a world of movies, book tickets, and enjoy the ultimate cinematic experience.</p>
        <Link to="/movies" style={{ 
		color: '#fff',
		backgroundColor: 'rgb(252, 3, 78)'
	}} className='btn-explore'>Book Now</Link>
      </div>
      <div className='trending' style={{color: '#fff'}}>
       <h1>Trending this week&nbsp;&#x1F525;</h1>
      </div>
      <div className="home-container">
          {movies.map((movie) => (
            <div className="movies" id={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <Link to={'/movies/movie?id='+ movie.id}>{movie.title}</Link>
            </div>
          ))}
       </div>
      <div className="features">
        <div className="feature">
          <i className="fas fa-ticket-alt" style={{ color: '#22254b'}}></i>
          <h3 style={{color:'#242333'}}>Easy Ticket Booking</h3>
          <p>Book your movie tickets hassle-free with just a few clicks.</p>
        </div>
        <div className="feature">
          <i className="fas fa-film" style={{ color: '#22254b'}}></i>
          <h3 style={{color: '#242333'}}>Wide Movie Selection</h3>
          <p>Choose from a vast collection of movies across various genres.</p>
        </div>
        <div className="feature">
          <i className="fas fa-heart" style={{ color: 'darkred'}}></i>
          <h3 style={{color: '#242333'}}>Personalized Recommendations</h3>
          <p>Get personalized movie recommendations based on your preferences.</p>
        </div>
       </div>
    </div>
    <Footer />
    </>
  );
}

