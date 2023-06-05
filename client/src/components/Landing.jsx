import React from 'react';
import { Link } from 'react-router-dom';
import '../static/landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header>
        <div className="logo">Cinemate</div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      <div className="hero">
        <h1>Discover the Magic of Cinema</h1>
        <p>Explore a world of movies, book tickets, and enjoy the ultimate cinematic experience.</p>
        <Link to="/movies" className="btn-explore">Explore Movies</Link>
      </div>

      <div className="features">
        <div className="feature">
          <i className="fas fa-ticket-alt"></i>
          <h3>Easy Ticket Booking</h3>
          <p>Book your movie tickets hassle-free with just a few clicks.</p>
        </div>
        <div className="feature">
          <i className="fas fa-film"></i>
          <h3>Wide Movie Selection</h3>
          <p>Choose from a vast collection of movies across various genres.</p>
        </div>
        <div className="feature">
          <i className="fas fa-heart"></i>
          <h3>Personalized Recommendations</h3>
          <p>Get personalized movie recommendations based on your preferences.</p>
        </div>
      </div>
    </div>
  );
}

