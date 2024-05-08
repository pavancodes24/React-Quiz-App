import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const PaymentDetails = () => {
  const [loading, setLoading] = React.useState(true);
  const [loading2, setLoading2] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const navigate = useNavigate();
  let dataOne = sessionStorage.getItem('orderId');

  if (!dataOne) navigate('/user-details');
  React.useEffect(() => {
    setLoading(true);
    async function datagetParam() {
      try {
        const base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
        const apiLink = `${base_url}/api/v1/order/getSdkParams`;
        console.log(dataOne, 'dataone');
        if (dataOne) {
          const { data } = await axios.post(apiLink, { orderId: dataOne });
          sessionStorage.setItem('tr', data?.sdk_params?.tr ?? '');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setErr(true);
      }
    }
    datagetParam();
  }, []);
  // document.body.style.backgroundColor = '#FDDB4D';

  const redirectToUPI = () => {
    const transactionId = sessionStorage.getItem('tr');
    const url = `intent://play/?pa=avisenterprises695278.rzp@axisbank&pn=AVISENTERPRISES&mc=7372&tr=${transactionId}&am=1.00#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`;
    window.location.href = url;
  };
  const redirectToUPIAPPLE = () => {
    const transactionId = sessionStorage.getItem('tr');
    const url = `amazonpay://upi/pay?pa=avisenterprises695278.rzp@axisbank&pn=AVISENTERPRISES&am=1.00&tr=${transactionId}&mc=7372`;
    window.location.href = url;
  };

  const redirectToWallet = () => {
    const url = sessionStorage.getItem('walletLink');
    window.location.href = url;
  };

  const handleClickPlay = () => {
    setLoading2(true);
    const base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
    const apiLink = `${base_url}/api/v1/order/getOrderStatus`;
    axios
      .post(apiLink, { orderid: dataOne })
      .then((res) => {
        console.log(res.data.data.status, 'checkres');
        if (res.data.data.status == 'CREATED') {
          alert('please make the payment to play');
        } else {
          navigate('/');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading2(false);
      });
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
          {sessionStorage.getItem('deviceType') == 'iPhone' ? (
            <>
              <div>
                <button
                  class="button1"
                  onClick={redirectToUPIAPPLE}
                  style={{
                    background: '#FDDB4D',
                    borderRadius: '30px',
                    border: 'none',
                    fontSize: '20px',
                    width: '150px',
                    padding: '.3rem 1rem',
                  }}
                >
                  AMAZON PAY
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
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

              <br></br>
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
            </>
          )}
        </div>

        <div>
          <button
            onClick={handleClickPlay}
            disabled={loading2}
            style={{
              backgroundColor: '#f44336',
              border: 'none',
              color: 'white',
              padding: '9px 16px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
            }}
          >
            {loading2 ? '...loading' : 'click to play'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
