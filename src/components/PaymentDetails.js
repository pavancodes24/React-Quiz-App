import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(false);

  const [intentUrlDetails, setIntentUrlDetails] = React.useState('');

  const navigate = useNavigate();
  let orderId = sessionStorage.getItem('orderId');

  if (!orderId) navigate('/user-details');
  React.useEffect(() => {
    setLoading(true);
    try {
      let base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
      let apiLink = `${base_url}/api/v1/order/getSdkParams`;
      let { data } = axios.post(apiLink, { orderId: orderId });
      // setIntentUrlDetails(data);
      sessionStorage.setItem('tr', data?.sdk_params?.tr);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(true);
    }
  }, []);

  return loading ? (
    <>...loading</>
  ) : err ? (
    <>something went wrong</>
  ) : (
    <div>
      <a
        href={`intent://play/?pa=avisenterprises695278.rzp@axisbank&pn=AVISENTERPRISES&mc=7372&tr=${sessionStorage.getItem(
          'tr'
        )}&am=1.00#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`}
        class="button1"
      >
        Amazon Pay UPI
      </a>
    </div>
  );
};

export default PaymentDetails;
