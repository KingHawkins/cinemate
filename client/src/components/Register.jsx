import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/index.css';
import user from '../user-solid.svg';
import apple from '../apple.png';
import lock from '../lock-solid.svg';
import phone from '../phone-solid.svg';

export default function Register () {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const contact = document.querySelector('#contact').value;
    setData({ username, email, password, contact });
  };
  const postData = (item) => {
    fetch('http://127.0.0.1:8000/register', {
	      method: 'POST',
	      headers: {
      			'Content-Type': 'application/json'
    	      },
	      body: JSON.stringify(item)
	   }).then(response => {
      		if (response.status === 201) {
        	   navigate('/login');
		 }
		 return response.json();
	   }).then(jsondata => console.log(jsondata));
  };
  useEffect(() => {
    postData(data);
  }, [data]);

  return (

    <div className='container'>
      <div id='alert' className='alert hidden'>Username or email exists
        <div id='progress-bar' className='progress-bar' />
      </div>
      <p>Create your Account</p>
      <form onSubmit={submitForm} id='form'>
        <div>
          <img src={user} width='12px' alt='' />
          <input type='text' name='username' id='username' placeholder='Enter your username' required/>
        </div>

        <div>
          <img src={apple} width='12px' alt='' />
          <input type='email' name='email' id='email' placeholder='Enter your email' required/>
        </div>
        <div>
          <img src={lock} width='12px' alt='' />
          <input type='password' name='password' id='password' placeholder='Enter your password' required />
        </div>
        <div>
          <img src={phone} width='12px' alt='' />
          <input type='text' name='contact' id='contact' placeholder='Enter your phone number' required/>
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
