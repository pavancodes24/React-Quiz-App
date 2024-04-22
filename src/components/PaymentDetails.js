import React, { useEffect } from 'react';

const PayByRazorPay = () => {
  const options = {
    key: 'rzp_live_eCiBctdExNpJVL',
    amount: '100', //  = INR 1
    name: 'Acme shop',
    description: 'some description',
    image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
    handler: function (response) {
      console.log(response);
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: 'Gaurav',
      contact: '9999999999',
      email: 'demo@demo.com',
    },
    notes: {
      address: 'some address',
    },
    theme: {
      color: 'blue',
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const initiateUPIPayment = () => {
    if (isMobile) {
      const UPI_URL = `upi://pay?pa=pavanc1997-2@okhdfcbank@upi&pn=pavan&am=10&cu=INR&tn=done&appId=razorpay`;
      const WEB_URL = `https://www.bhimupi.org.in/payment?pa=yourvpa@upi&pn=RECIPIENT_NAME&am=AMOUNT&cu=INR&tn=TRANSACTION_NOTE`;

      window.open(UPI_URL, '_self');
    } else {
      console.log('UPI payment is only available on mobile devices.');
    }
  };

  return (
    <>
      <button onClick={openPayModal}>Pay with Razorpay</button>
      {isMobile && <button onClick={initiateUPIPayment}>Pay with UPI</button>}
    </>
  );
};

export default PayByRazorPay;
