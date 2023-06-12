import React, {useState, useEffect} from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useNavigate, Link} from 'react-router-dom';
import { createTicket, email } from './ticketCreation.js';
import '../static/paypal.css';
import Footer from './Footer';


const PayPalButton = () => {
  const [payment, setPayment] = useState(0);
  const navigate = useNavigate();
  // PayPal SDK options
  const paypalOptions = {
    "client-id": "AWbvlg_vBugSrm-v0-cJ9cuqo8FCHcmXQPBmIkkjNIEHSmcYPf1voNdfBuGecSYz0IIOPwZTY-y4sA54",
    currency: "USD",
  };

  // PayPal button styles
  const buttonStyles = {
    layout: "vertical",
    color: "gold",
    shape: "pill",
    label: "paypal",
  };

  // On successful payment
  const onPaymentSuccess = (data) => {
    console.log("Payment successful!", data);
    // Perform any necessary actions after payment
    localStorage.removeItem('array');
    navigate('/');
    
  };

  // On error or cancellation
  const onPaymentError = (error) => {
    console.log("Payment error or cancellation!", error);
    // Handle error or cancellation
  };

  useEffect(() => {
	  setPayment(localStorage.getItem('count') * 10)
  }, []);
  return (
    <>
    <header>
	    <nav>
          <ul>
            <li><Link to='/seatmap'><i className="fas fa-chevron-left back-icon" /></Link></li>
          </ul>
        </nav>
        </header>
    <div className='payment-container'>
    <PayPalScriptProvider options={paypalOptions}>
     <div className='payment-button'>
      <PayPalButtons
        style={buttonStyles}
        createOrder={(data, actions) => {
          // Define your createOrder function to set up the payment details
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${payment}.00`,
                },
	      payee: {
                email_address: "sb-d76qe26185016@business.example.com" 
                }
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Capture the payment and execute any necessary actions
	  localStorage.setItem("paypal", data.orderID);
	  for(const seat of JSON.parse(localStorage.getItem('array'))){
	  	createTicket(data.orderID, seat);
		email(data.orderID, seat);
	  }
          return actions.order.capture().then(onPaymentSuccess);
        }}
        onError={onPaymentError}
      />
     </div>
    </PayPalScriptProvider>
    </div>
    <Footer />
   </>
  );
};

export default PayPalButton;

