import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import '../static/ticket.css';
import logo from '../logo.png';
import Footer from './Footer';

export default function Ticket () {
  const [ticket, setTicket] = useState({});
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState('');
  const fetchMovie = (id) => {
  	return fetch(`http://127.0.0.1:8000/movies/${id}`)
    		.then(response => response.json())
    		.catch(err => console.error(err));
  };
  const getData = (ticket_id) => {
    fetch(`http://127.0.0.1:8000/tickets/${ticket_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => response.json()).then(data => {
	    setTicket(data);
	    setDate(new Date(data.created_at.slice(0, -3) + 'Z').toISOString().split('T')[0]);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem('ticket');
      const movie_id = localStorage.getItem('movie');
      setMovie(await fetchMovie(movie_id));
      getData(id);
    };
    fetchData();
  }, []);
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to='/dashboard'><i className='fas fa-chevron-left back-icon' /></Link></li>
          </ul>
        </nav>
      </header>
      <div className='ticket'>
        <div className='ticket-header'>
          <img src={logo} />
          <p style={{ textTransform: 'uppercase' }}><strong>created: </strong>{date}</p>
        </div>
        <div className='ticket-info'>
          <div className='details'>
            <div className='distributions'>
              <span>Transcation ID:</span>
              <p>{ticket.booking_id}</p>
            </div>
            <div className='distributions'>
              <span>Movie:</span>
              <p>{ticket.movie}</p>
            </div>
            <div className='distributions'>
              <span>Cinema:</span>
              <p>{ticket.cinema}</p>
            </div>
            <div className='distributions'>
              <span>Streaming:</span>
              <p>{movie.release_date}</p>
            </div>
            <div className='distributions'>
              <span>Price:</span>
              <p>{ticket.price}</p>
            </div>
            <div className='distributions'>
              <span>Seat Number:</span>
              <p>{ticket.seat_number}</p>
            </div>
          </div>
          <div className='qrcode'>
            <QRCode value={JSON.stringify(ticket)} size={128} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
