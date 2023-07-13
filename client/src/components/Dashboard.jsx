import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../static/tickets.css';
import Footer from './Footer';


export default function Dashboard () {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [tickets, setTicket] = useState([]);
  const fetchUser = () => {
    try {
      fetch('http://127.0.0.1:8000/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(response => response.json())
	    .then(data => setUser(data));
    } catch (err) { console.err(err); }
  };
  const Logout = () => {
    fetch('http://127.0.0.1:8000/logout', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => {
      localStorage.removeItem('access_token');
      navigate('/');
      return response.json();
    }).then(jsondata => jsondata).catch(err => console.error(err));
  };
  const Signout = () => {
    fetch('http://127.0.0.1:8000/signout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => {
      localStorage.removeItem('access_token');
      navigate('/');
      return response.json();
    }).then(jsondata => jsondata);
  };

  const getData = () => {
    fetch('http://127.0.0.1:8000/tickets', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => response.json()).then(data => setTicket(data));
  };
  useEffect(() => {
    fetchUser();
    getData();
  }, []);

  return (
    <>
      <header>
        <div className='logo'><i className='fas fa-user-circle user-icon' />&nbsp;Hi, {user.username}</div>
        <nav>
          <ul>
            <li><Link to='/'>home</Link></li>
            <li onClick={Signout} style={{ cursor: 'pointer' }}>signout</li>
            <li onClick={Logout} style={{ cursor: 'pointer' }}>logout</li>
          </ul>
        </nav>
      </header>
      <div className='tickets-container'>
        <div className='tickets'>
          <h2>My Tickets<i className='fas fa-ticket-alt ticket-icon' /></h2>
          <p>View all tickets you have booked</p>
        </div>
        <div className='table-wrapper'>
          <table className='ticket-table'>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
                <th>Seat Number</th>
                <th>Ticket</th>
                {/* Add additional table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.booking_id}</td>
                  <td>{new Date(ticket.created_at).toISOString().split('T')[0]}</td>
                  <td>{new Date(ticket.created_at).toISOString().split('T')[1].split('.')[0]}</td>
                  <td>{ticket.price}</td>
                  <td>{ticket.seat_number}</td>
                  <td><button
                    className='ticket-button' onClick={() => {
				  localStorage.setItem('ticket', ticket.id);
			          navigate('/dashboard/ticket');
			          window.scrollTo(0, 0);
                  }}
                      >View</button>
                  </td>
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
