import React, { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import '../static/account.css'
import  github from '../github.png'
import apple from '../apple.png'
import  social from '../social.png'
import logo from '../logo.png'
import user from '../user-solid.svg'
import lock from '../lock-solid.svg'
import phone from '../phone-solid.svg'

export default function Login()  {
  const [data, setData] = useState({})
  const getData = (e) => {
     e.preventDefault()
     const username = document.querySelector('#username').value
     const password = document.querySelector('#password').value
     setData({username, password})
     console.log(data)
  }
  const postData = (item) => {
     fetch('http://127.0.0.1:5000/api/login', {
	     method: 'POST',
	     headers: {
		 'Content-Type': 'application/json'
	     },
	     body: JSON.stringify(item)
	  }).then(response => {
		 if (response.status === 401){
		    document.querySelector('#username').style['border-color'] = 'red'
		 }
		 return response.json()
	  })
	  .then(jsondata => console.log(jsondata))
          .catch(err => {
		  console.error(err.status)
	 })
  }
  useEffect(() => {
	  postData(data)
  }, [data])
  return (
    <div className="login">
        <div className="cinema">
          <img src={ logo } alt=""/>
        </div>
	<form onSubmit={getData} id="login">
            <div>
                <img src={ user } width="12px" alt=""/>
                <input type="text" name="username" id="username" placeholder="Enter your username"/>
            </div>
           <div>
               <img src={ lock } width="12px"alt=""/>
               <input type="password" name="password" id="password" placeholder="Enter your password" required/>
           </div>
           <button type="submit">Login</button>
        </form>
	  {/*<p>Login to your account</p>
	  <div className="images">
          <img src={ social } alt=""/>
          <img src={ apple } alt=""/>
          <img src={ github } alt=""/>
        </div>*/}
        <div className="link">
          <p>Dont have an account? <Link to="/register">Create an Account</Link></p>
        </div>
    </div>

  )
}
