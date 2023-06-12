import React from 'react';
import { Link } from 'react-router-dom';
import '../static/footer.css';

export default function Footer ({margin}) {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-content'>
	  <div className='ft'>
	    <Link to='/about' onScrollTop={true}>About Us</Link>
            <Link to="#">
              Contact Us
            </Link>
            <Link to="https://github.com/KingHawkins/cinemate" target="_blank">
              <i className="fab fa-github footer-icon"></i>
            </Link>
            <Link to="https://www.linkedin.com/in/bob-hawkins-218626242/" target="_blank">
              <i className="fab fa-linkedin footer-icon"></i>
            </Link>
	  </div>
          <p class='footer-description'>Your ultimate movie ticket booking app</p>
       </div>
      </div>
    </footer>
  );
}
