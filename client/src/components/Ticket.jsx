import React from 'react';
import QRCode from 'qrcode.react';
import '../static/ticket.css';
import logo from '../logo.png';

export default function Ticket () {
  const ticketData = {
    id: 'CIN32',
    movieTitle: 'Avengers: Endgame',
    cinema: 'Cineplex Cinemas',
    date: '2023-06-10',
    time: '19:30',
    payment: 'Paid',
    seatNumber: 'A1'
  };

  return (
    <div className='ticket'>
      <div className='ticket-header'>
        <img src={logo} />
        <p style={{textTransform:'uppercase'}}><strong>date generated:</strong> {ticketData.date}</p>
      </div>
      <div className='ticket-info'>
        <div className='details'>
          <div className='distributions'>
            <span>Ticket ID:</span>
            <p>{ticketData.id}</p>
          </div>
          <div className='distributions'>
            <span>Movie:</span>
            <p>{ticketData.movieTitle}</p>
          </div>
          <div className='distributions'>
            <span>Cinema:</span>
            <p>{ticketData.cinema}</p>
          </div>
	  <div className='distributions'>
            <span>Streaming:</span>
            <p>{ticketData.date}</p>
          </div>
          <div className='distributions'>
            <span>Time:</span>
            <p>{ticketData.time}</p>
          </div>
          <div className='distributions'>
            <span>Payment:</span>
            <p>{ticketData.payment}</p>
          </div>
          <div className='distributions'>
            <span>Seat Number:</span>
            <p>{ticketData.seatNumber}</p>
          </div>
        </div>
        <div className='qrcode'>
          <QRCode value={JSON.stringify(ticketData)} size={128} />
        </div>
      </div>
    </div>
  );
}
