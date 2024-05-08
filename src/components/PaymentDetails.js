import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://hovpyzfjuyoqjlakwxjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdnB5emZqdXlvcWpsYWt3eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDQxNzAsImV4cCI6MjAyMjEyMDE3MH0.6OmSG6kd5UQFDayTSDADe7CeMN__Wc5Hbk4jWYQsg4c'
);
const PaymentDetails = () => {
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(true);
  const [showButton, setShowButton] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const navigate = useNavigate();
  let dataOne = sessionStorage.getItem('orderId');
  const getOrderStatusApi = async () => {
    const base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
    const apiLink = `${base_url}/api/v1/order/getOrderStatus`;
    const orderid = sessionStorage.getItem('orderId');

    let { data } = await axios.post(apiLink, { orderid: orderid });
    console.log(data.data.status, 'testingdatadata');
    const { data2, error2 } = await supabase
      .from('users')
      .update({
        status: data.data.status == 'CHARGED' ? true : false,
      })
      .eq('mobile', localStorage.getItem('mobile'))
      .select();

    if (data.data.status == 'CHARGED') {
      navigate('/');
    } else {
      setLoading3(false);
      alert('Please make the payment to proceed');
    }
  };

  if (!dataOne) navigate('/user-details');
  React.useEffect(() => {
    if (localStorage.getItem('gameLink') != 0) {
      getOrderStatusApi();
    }
  }, []);
  React.useEffect(() => {
    // updatingids();
    if (localStorage.getItem('gameLink') == 0) {
      setLoading(true);
      async function datagetParam() {
        try {
          const base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
          const apiLink = `${base_url}/api/v1/order/getSdkParams`;
          console.log(dataOne, 'dataone');
          if (dataOne) {
            const { data } = await axios.post(apiLink, { orderId: dataOne });
            console.log(data.data.payment, 'data');
            if (data.data.status == 'CHARGED') {
              const { data2, error2 } = await supabase
                .from('users')
                .update({
                  status: data.data.status == 'CHARGED' ? true : false,
                })
                .eq('mobile', localStorage.getItem('mobile'))
                .select();

              if (data.data.status == 'CHARGED') {
                navigate('/');
              }
            }
            sessionStorage.setItem(
              'tr',
              data?.data?.payment?.sdk_params?.tr ?? ''
            );
            sessionStorage.setItem(
              'merchant_name',
              data?.data?.payment?.sdk_params?.merchant_name ?? ''
            );
            sessionStorage.setItem(
              'merchant_vpa',
              data?.data?.payment?.sdk_params?.merchant_vpa ?? ''
            );
            sessionStorage.setItem(
              'amount',
              data?.data?.payment?.sdk_params?.amount ?? ''
            );

            sessionStorage.setItem(
              'mcc',
              data?.data?.payment?.sdk_params?.mcc ?? ''
            );

            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          setErr(true);
        } finally {
          localStorage.getItem('gameLink', 1);
          setLoading3(false);
        }
      }
      datagetParam();
    }
  }, []);
  // document.body.style.backgroundColor = '#FDDB4D';

  const redirectToUPI = () => {
    // localStorage.setItem('gameLink', 1);
    const transactionId = sessionStorage.getItem('tr');
    const pa = sessionStorage.getItem('merchant_vpa');
    const pn = sessionStorage.getItem('merchant_name');
    const mc = sessionStorage.getItem('mcc');
    const am = sessionStorage.getItem('amount');

    if (!pa) {
      navigate('/user-details');
    }

    const url = `intent://play/?pa=${pa}&pn=${pn}&mc=${mc}&tr=${transactionId}&am=${am}#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`;
    console.log(url, 'urldata');
    window.location.href = url;
  };
  const redirectToUPIAPPLE = () => {
    // localStorage.setItem('gameLink', 1);
    const transactionId = sessionStorage.getItem('tr');
    const pa = sessionStorage.getItem('merchant_vpa');
    const pn = sessionStorage.getItem('merchant_name');
    const mc = sessionStorage.getItem('mcc');
    const am = sessionStorage.getItem('amount');

    if (!pa) {
      navigate('/user-details');
    }
    const url = `amazonpay://upi/pay?pa=${pa}&pn=${pn}&am=${am}&tr=${transactionId}&mc=${mc}`;
    window.location.href = url;
  };

  const redirectToWallet = () => {
    // localStorage.setItem('gameLink', 1);
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

  return loading || loading3 ? (
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
          {localStorage.getItem('deviceType') == 'iPhone' ? (
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
          {/* {showButton ? ( */}
          <button
            onClick={getOrderStatusApi}
            // disabled={loading2}
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
            click to play
            {/* {loading2 ? '...loading' : 'click to play'} */}
          </button>
          {/* ) : (
            ''
          )} */}
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
