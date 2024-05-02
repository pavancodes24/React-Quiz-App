import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(false);

  const [intentUrlDetails, setIntentUrlDetails] = React.useState('');

  const navigate = useNavigate();
  let dataOne = sessionStorage.getItem('orderId');

  if (!dataOne) navigate('/user-details');
  React.useEffect(() => {
    setLoading(true);
    try {
      let base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
      let apiLink = `${base_url}/api/v1/order/getSdkParams`;
      let { data } = axios.get(apiLink, {
        // Optionally, you can pass a body with a GET request, but it's not recommended.
        data: {
          orderId: dataOne,
        },
      });
      // setIntentUrlDetails(data);
      sessionStorage.setItem('tr', data?.sdk_params?.tr);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(true);
    }
  }, []);
  // document.body.style.backgroundColor = '#FDDB4D';

  const redirectToUPI = () => {
    const transactionId = sessionStorage.getItem('tr');
    const url = `intent://play/?pa=avisenterprises695278.rzp@axisbank&pn=AVISENTERPRISES&mc=7372&tr=${transactionId}&am=1.00#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`;
    window.location.href = url;
  };

  const redirectToWallet = () => {
    const url = sessionStorage.getItem('walletLink');
    window.location.href = url;
  };

  return loading ? (
    <>...loading</>
  ) : err ? (
    <>something went wrong</>
  ) : (
    <>
      <div
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <img src={'/apay.jpeg'} alt="apay" height={'50px'} width={'240px'} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6vh',
          height: '60vh',
        }}
      >
        <div>
          {' '}
          {/* <a
          href={`intent://play/?pa=avisenterprises695278.rzp@axisbank&pn=AVISENTERPRISES&mc=7372&tr=${sessionStorage.getItem(
            'tr'
          )}&am=1.00#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`}
          class="button1"
        >
          Amazon Pay UPI
        </a> */}
          <button
            class="button1"
            onClick={redirectToUPI}
            style={{
              background: '#FDDB4D',
              borderRadius: '30px',
              border: 'none',
              fontSize: '20px',
              width: '150px',
              padding: '.3rem 1rem',
            }}
          >
            UPI
          </button>
        </div>
        <div>
          <button
            class="button1"
            onClick={redirectToWallet}
            style={{
              background: '#FDDB4D',
              borderRadius: '30px',
              border: 'none',
              fontSize: '20px',
              width: '150px',
              padding: '.3rem 1rem',
            }}
          >
            Wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
