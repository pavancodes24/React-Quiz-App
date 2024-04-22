import React, { useEffect, useState } from 'react';

const PayByRazorPay = () => {
  const [availableApps, setAvailableApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/razorpay.js';
    script.async = true;
    script.onload = () => {
      const razorpay = new window.Razorpay({ key: 'rzp_live_eCiBctdExNpJVL' });
      razorpay.on('rzp_device_unsupported', () => {
        alert('UPI is not supported on this device.');
      });
      razorpay.on('ready', () => {
        razorpay
          .getSupportedUpiIntentApps()
          .then((response) => {
            if (response.apps.length > 0) {
              setAvailableApps(response.apps);
            } else {
              setError('No UPI payment apps available.');
            }
          })
          .catch(() => {
            setError('Error fetching UPI payment apps.');
          });
      });
    };
    document.body.appendChild(script);
  }, []);

  const initiateUPIPayment = (app) => {
    setIsLoading(true);
    const paymentData = {
      amount: 100, // amount in paise (100 equals ₹1)
      method: 'upi',
      contact: '9000090000', // customer's mobile number
      email: 'gaurav.kumar@example.com', // customer's email address
      order_id: 'order_00000000000001', // and other payment parameters, as usual
    };

    const razorpay = new window.Razorpay({ key: 'rzp_live_eCiBctdExNpJVL' });
    razorpay
      .createPayment(paymentData, { app: app })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        alert(
          `Payment successful. Payment ID: ${response.razorpay_payment_id}`
        );
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        alert('Payment failed.');
      });
  };

  return (
    <div>
      {error ? (
        <div>
          <h2>{error}</h2>
        </div>
      ) : availableApps.length > 0 ? (
        <div>
          <h2>Select UPI Payment App</h2>
          <ul>
            {availableApps.map((app, index) => (
              <li key={index}>
                <button
                  onClick={() => initiateUPIPayment(app)}
                  disabled={isLoading}
                >
                  {app}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default PayByRazorPay;
