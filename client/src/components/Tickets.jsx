import React, { useState, useEffect } from 'react';
import '../static/tickets.css';
import Footer from './Footer';
export default function Tickets () {
  const ticketData = [
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    { 
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 2,
      movieTitle: 'The Lion King',
      cinema: 'AMC Theatres',
      date: '2023-06-12',
      time: '18:00',
      payment: 'Paid',
      seatNumber: 'B2'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      cinema: 'Cineplex Cinemas',
      date: '2023-06-10',
      time: '19:30',
      payment: 'Paid',
      seatNumber: 'A1'
    },
  ];
  return (
    <>	  
    <div className='tickets-container'>
      <div className='welcome'>Hello</div>
      <div className='tickets'>
        <h2>My Tickets<i className='fas fa-ticket-alt ticket-icon' /></h2>
        <p>View all tickets you have booked</p>
      </div>
      <div className='table-wrapper'>
        <table className='ticket-table'>
          <thead>
            <tr>
              <th>Ticket ID</th>
	  {/*<th>Movie Title</th>*/}
	  {/*<th>Cinema</th>*/}
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
              <th>Seat Number</th>
	      <th>Ticket</th>
              {/* Add additional table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {ticketData.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
		    {/*<td>{ticket.movieTitle}</td>*/}
		    {/*<td>{ticket.cinema}</td>*/}
                <td>{ticket.date}</td>
                <td>{ticket.time}</td>
                <td>{ticket.payment}</td>
                <td>{ticket.seatNumber}</td>
		<td><button className='ticket-button'>View</button></td>
                {/* Add additional table cells for other ticket details */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     </div> 
    <Footer />
   </>
  );
}
