import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../static/movie-info.css';

export default function Movie () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [movie, setMovie] = useState([]);
  const fetchMovie = async (id) => {
    try {
	    const response = await fetch(`http://127.0.0.1:8000/movies/${id}`);
	    const data = await response.json();
	    setMovie(data);
    } catch (err) {
	    console.error(err);
    }
  };
  useEffect(() => {
    fetchMovie(id);
  }, [id]);
  return (
    <>
      <div className='movie-info'>
        <div
          className='movie' id={movie.id} style={{
		      backgroundImage: `url(${movie.poster_url})`
	      }}
        >
          <img src={movie.poster_url} alt={movie.title} />
          <div className='description'>
            <h1>{movie.title}</h1>
	    <p><strong style={{color: 'black'}}>Streaming:&nbsp;</strong>{movie.release_date}</p>
            <p><strong style={{ color: 'black'}}>Cinema:</strong>&nbsp;Cinemate&nbsp;Cineplex</p>
            <button onClick={() => {
			   document.querySelector('.modal').style.transform = 'scale(1)';
			   document.querySelector('iframe').style.display = 'block';
		   }}
            >Play Trailer
            </button>
            <p>{movie.overview}</p>
	    <Link to='/seatmap' onScrollTop={true}><button style={{
			backgroundColor: '#22254b',
			marginTop: '15px',
			borderRadius: '5px',
			padding: '8px',
			width: '4rem'
		}} onClick={() => {localStorage.setItem('movie', movie.id)}}>Book</button></Link>
          </div>
          <div className='movie-overlay' />
        </div>
      </div>
      <div className='modal'>
        <div className='modal-close'><i
          class='fas fa-times close-icon' onClick={() => {
	      const modal = document.querySelector('.modal');
	      const iframe = modal.querySelector('iframe');

	      // Pause the YouTube video
	      const player = iframe.contentWindow;
	      player.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');

	      modal.style.transform = 'scale(0)';
	      iframe.style.display = 'none';
	    }}
         />
        </div>
        <iframe width='300' height='200' src={movie.trailer_url} frameBorder='0' allowFullScreen />
      </div>
    </>
  );
}
