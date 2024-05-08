import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const PaymentDetails = () => {
  const [loading, setLoading] = React.useState(true);
  const [loading2, setLoading2] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);
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
          console.log(data, 'data');
          sessionStorage.setItem('tr', data?.sdk_params?.tr ?? '');
          sessionStorage.setItem(
            'merchant_name',
            data?.sdk_params?.merchant_name ?? ''
          );
          sessionStorage.setItem(
            'merchant_vpa',
            data?.sdk_params?.merchant_vpa ?? ''
          );
          sessionStorage.setItem('amount', data?.sdk_params?.amount ?? '');

          sessionStorage.setItem('mcc', data?.sdk_params?.mcc ?? '');

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
    localStorage.setItem('gameLink', 1);
    const transactionId = sessionStorage.getItem('tr');
    const pa = sessionStorage.getItem('merchant_vpa');
    const pn = sessionStorage.getItem('merchant_name');
    const mc = sessionStorage.getItem('mcc');
    const am = sessionStorage.getItem('amount');

    const url = `intent://play/?pa=${pa}&pn=${pn}&mc=${mc}&tr=${transactionId}&am=${am}#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`;
    window.location.href = url;
  };
  const redirectToUPIAPPLE = () => {
    localStorage.setItem('gameLink', 1);
    const transactionId = sessionStorage.getItem('tr');
    const pa = sessionStorage.getItem('merchant_vpa');
    const pn = sessionStorage.getItem('merchant_name');
    const mc = sessionStorage.getItem('mcc');
    const am = sessionStorage.getItem('amount');
    const url = `amazonpay://upi/pay?pa=${pa}&pn=${pn}&am=${am}&tr=${transactionId}&mc=${mc}`;
    window.location.href = url;
  };

  const redirectToWallet = () => {
    localStorage.setItem('gameLink', 1);
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
          {localStorage.getItem('gameLink') == '1' ? (
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
          {showButton ? (
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
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
