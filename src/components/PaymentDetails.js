import React from 'react';



const PaymentDetails = () => {
  const [loading, setLoading] = React.useState(false);
  const order_api= `https://api.juspay.in/orders`;
  const getOrderStatus = ()=>{
    
  }
  return (
    <div>
      <a
        href="intent://play/?pa=avisenterprises695278.rzp@axisbank&pn=AVISENTERPRISES&mc=7372&tr=O4QlKEhwHLkb1J&am=1.00#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end"
        class="button1"
      >
        Amazon Pay UPI
      </a>
    </div>
  );
};

export default PaymentDetails;
