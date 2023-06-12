import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../static/seatmap.css';

export default function SeatMap () {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const handleSeatClick = (e) => {
    const clickedSeat = e.target; let array = [];

    /*
     * Removes selected seat ids and from localstorage
     * */
    if (clickedSeat.classList.contains('selected')) {
      clickedSeat.classList.remove('selected');
      localStorage.removeItem(clickedSeat.id);
      let filter = JSON.parse(localStorage.getItem('array'));
      localStorage.setItem('array', JSON.stringify(filter.filter(item => item !== clickedSeat.id)));
      setCount(prev => prev - 1);
    } else {
      /*
       * Set selected seat ids and an array of selected seat ids to localStorage.
       * The purpose of the array is to capture the seat ids selected for the purpose of booking.
       * After each sucessful booking, the array is removed from the localStorage so as not to make users pay for unselected extra seats.
       * */
      clickedSeat.classList.add('selected');
      localStorage.setItem(clickedSeat.id, clickedSeat.id); array.push(clickedSeat.id);
      if(localStorage.getItem('array')){
	  let retrieve = JSON.parse(localStorage.getItem('array')); retrieve.push(clickedSeat.id);
	  localStorage.setItem('array', JSON.stringify(retrieve));
      }else localStorage.setItem('array', JSON.stringify(array));
      setCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    /*
     * Load selected seat ids from localStorage and renders them to the DOM as selected.
     * */
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    let initialCount = 0;
    seats.forEach(seat => {
      if (localStorage.getItem(seat.id)) {
        seat.classList.add('selected');
        initialCount++;
	/*
	 * After successful payment, the selected seat ids in the localStorage are retrieved and marked as occupied.
	 * `paypal` is used as an indicator for successful payment since it is set to localStorage only after successful payment.
	 * */
      	if (localStorage.getItem('paypal')){
	    seat.classList.add('occupied');
      }
    }
      seat.addEventListener('click', handleSeatClick);
    });
    setCount(initialCount);
    return () => {
      seats.forEach(seat => {
        seat.removeEventListener('click', handleSeatClick);
      });
    };
  }, []);

  useEffect(() => {
    setPrice(count * 10);
    localStorage.setItem('count', count);
  }, [count]);
  return (
    <div className='body'>
      <div className='seatmap-container'>
      </div>
      <ul className='showcase'>
        <li>
          <div className='seat' />
          <small>N/A</small>
        </li>
        <li>
          <div className='seat selected' />
          <small>Selected</small>
        </li>
        <li>
          <div className='seat occupied' />
          <small>Occupied</small>
        </li>
      </ul>
      <div className='seats-container'>
        <div className='screen' />
        <div className='row'>
          <div className='seat occupied' id='A1' />
          <div className='seat' id='A2' />
          <div className='seat' id='A3' />
          <div className='seat' id='A4' />
          <div className='seat' id='A5' />
          <div className='seat' id='A6' />
          <div className='seat' id='A7' />
          <div className='seat' id='A8' />
        </div>
        <div className='row'>
          <div className='seat' id='B9' />
          <div className='seat' id='B10' />
          <div className='seat' id='B11' />
          <div className='seat' id='B12' />
          <div className='seat occupied' id='B13' />
          <div className='seat' id='B14' />
          <div className='seat' id='B15' />
          <div className='seat' id='B16' />
        </div>
        <div className='row'>
          <div className='seat' id='C17' />
          <div className='seat' id='C18' />
          <div className='seat' id='C19' />
          <div className='seat' id='C20' />
          <div className='seat' id='C21' />
          <div className='seat' id='C22' />
          <div className='seat' id='C23' />
          <div className='seat' id='C24' />
        </div>
        <div className='row'>
          <div className='seat' id='C25' />
          <div className='seat' id='C26' />
          <div className='seat' id='C27' />
          <div className='seat' id='C28' />
          <div className='seat' id='C29' />
          <div className='seat' id='C30' />
          <div className='seat' id='C31' />
          <div className='seat' id='C32' />
        </div>
        <div className='row'>
          <div className='seat' id='D33' />
          <div className='seat' id='D34' />
          <div className='seat' id='D35' />
          <div className='seat' id='D36' />
          <div className='seat' id='D37' />
          <div className='seat' id='D38' />
          <div className='seat' id='D39' />
          <div className='seat' id='D40' />
        </div>
        <div className='row'>
          <div className='seat' id='D41' />
          <div className='seat' id='D42' />
          <div className='seat' id='D43' />
          <div className='seat' id='D44' />
          <div className='seat' id='D44' />
          <div className='seat' id='D45' />
          <div className='seat' id='D46' />
          <div className='seat' id='D47' />
        </div>
        <div className='row'>
          <div className='seat' id='D48' />
          <div className='seat' id='D49' />
          <div className='seat' id='D50' />
          <div className='seat' id='D51' />
          <div className='seat' id='D52' />
          <div className='seat' id='D52' />
          <div className='seat' id='D53' />
          <div className='seat' id='D54' />
        </div>
        <div className='row'>
          <div className='seat' id='D55' />
          <div className='seat' id='D56' />
          <div className='seat' id='D57' />
          <div className='seat' id='D58' />
          <div className='seat' id='D59' />
          <div className='seat' id='D60' />
          <div className='seat' id='D61' />
          <div className='seat' id='D62' />
        </div>
      </div>
      <p className='text'>Selected&nbsp;<span className='count'>{count}</span>&nbsp;for a price of $:&nbsp;<span className='total'>{price}</span></p>
		<Link to='/seatmap/pay' onScrollTop={true}><button style={{
			backgroundColor: '#49c9c3',
			marginTop: '15px',
			borderRadius: '5px'
		}}>Go to Payment</button></Link>
    </div>
  );
}
