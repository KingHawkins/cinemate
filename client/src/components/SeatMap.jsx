import React, { useEffect, useState } from 'react';
import '../static/seatmap.css';
export default function SeatMap () {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  /* const click = () => {
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    seats.forEach(seat => {
	    seat.addEventListener('click', (e) => {
        if (seat.classList.contains('selected')) {
          seat.classList.remove('selected');
          setCount(prev => prev - 1);

        } else {
		    seat.classList.add('selected');
		    setCount(prev => prev + 1);
		    setPrice(count * 10);
	    }
		    setPrice(count * 10);
      });
    });
  };
  useEffect(() => {
	  click()
  }, []) */
  const handleSeatClick = (e) => {
    const clickedSeat = e.target;

    if (clickedSeat.classList.contains('selected')) {
      clickedSeat.classList.remove('selected');
      localStorage.removeItem(clickedSeat.id);
      setCount(prev => prev - 1);
    } else {
      clickedSeat.classList.add('selected');
      localStorage.setItem(clickedSeat.id, 'selected');
      setCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    let initialCount = 0;
    seats.forEach(seat => {
      if (localStorage.getItem(seat.id)) {
        seat.classList.add('selected');
        initialCount++;
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
      <marquee>Book Now</marquee>
      <div className='seatmap-container'>
        <label>Pick a Movie:</label>
        <select id='pick-movie'>
          <option value='10' />
          <option value='12' />
          <option value='8' />
          <option value='9' />
        </select>
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
          <div className='seat occupied' id='1' />
          <div className='seat' id='2' />
          <div className='seat' id='3' />
          <div className='seat' id='4' />
          <div className='seat' id='5' />
          <div className='seat' id='6' />
          <div className='seat' id='7' />
          <div className='seat' id='8' />
        </div>
        <div className='row'>
          <div className='seat' id='9' />
          <div className='seat' id='10' />
          <div className='seat' id='11' />
          <div className='seat' id='12' />
          <div className='seat occupied' id='13' />
          <div className='seat' id='14' />
          <div className='seat' id='15' />
          <div className='seat' id='16' />
        </div>
        <div className='row'>
          <div className='seat' id='17' />
          <div className='seat' id='18' />
          <div className='seat' id='19' />
          <div className='seat' id='20' />
          <div className='seat' id='21' />
          <div className='seat' id='22' />
          <div className='seat' id='23' />
          <div className='seat' id='24' />
        </div>
        <div className='row'>
          <div className='seat' id='25' />
          <div className='seat' id='26' />
          <div className='seat' id='27' />
          <div className='seat' id='28' />
          <div className='seat' id='29' />
          <div className='seat' id='30' />
          <div className='seat' id='31' />
          <div className='seat' id='32' />
        </div>
        <div className='row'>
          <div className='seat' id='33' />
          <div className='seat' id='34' />
          <div className='seat' id='35' />
          <div className='seat' id='36' />
          <div className='seat' id='37' />
          <div className='seat' id='38' />
          <div className='seat' id='39' />
          <div className='seat' id='40' />
        </div>
        <div className='row'>
          <div className='seat' id='41' />
          <div className='seat' id='42' />
          <div className='seat' id='43' />
          <div className='seat' id='44' />
          <div className='seat' id='44' />
          <div className='seat' id='45' />
          <div className='seat' id='46' />
          <div className='seat' id='47' />
        </div>
        <div className='row'>
          <div className='seat' id='48' />
          <div className='seat' id='49' />
          <div className='seat' id='50' />
          <div className='seat' id='51' />
          <div className='seat' id='52' />
          <div className='seat' id='52' />
          <div className='seat' id='53' />
          <div className='seat' id='54' />
        </div>
        <div className='row'>
          <div className='seat' id='55' />
          <div className='seat' id='56' />
          <div className='seat' id='57' />
          <div className='seat' id='58' />
          <div className='seat' id='59' />
          <div className='seat' id='60' />
          <div className='seat' id='61' />
          <div className='seat' id='62' />
        </div>
      </div>
      <p className='text'>Selected&nbsp;<span className='count'>{count}</span>&nbsp;for a price of $:&nbsp;<span className='total'>{price}</span></p>
		<button style={{
			backgroundColor: '#228B22',
			marginTop: '15px'
		}}>Go to Payment</button>
    </div>
  );
}
