import React from 'react';

import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const supabase = createClient(
  'https://hovpyzfjuyoqjlakwxjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdnB5emZqdXlvcWpsYWt3eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDQxNzAsImV4cCI6MjAyMjEyMDE3MH0.6OmSG6kd5UQFDayTSDADe7CeMN__Wc5Hbk4jWYQsg4c'
);

const EnterDetails = () => {
  const [detail, setDetail] = React.useState({});
  const [device, setDevice] = React.useState('');
  const [loaderNav, setLoaderNav] = React.useState(false);
  const [mainLoader, setMainLoader] = React.useState(false);
  const [createOrderData, setCreateOrderData] = React.useState({});
  const [orderapi, setOrderApi] = React.useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMainLoader(true);
    insertData(detail);
  };

  let base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
  async function callOrderData(imp = false, orderdata = null) {
    let body = {};
    if (!orderdata) {
      body = {
        orderIdFront: orderdata,
      };
    }
    let apilink = `${base_url}/api/v1/order/getorders`;
    let { data } = await axios.post(apilink, body);
    sessionStorage.setItem('orderId', data.order_id);
    localStorage.setItem('orderId', data.order_id);
    const { data2, error2 } = await supabase
      .from('users')
      .update({
        order_id: data.order_id,
        status: false,
      })
      .eq('mobile', sessionStorage.getItem('mobile'))
      .select();
    sessionStorage.setItem('walletLink', data.payment_links.web);
    localStorage.setItem('gameLink', 0);
    setMainLoader(false);
    navigate('/payment');
  }

  const getDeviceData = () => {
    setLoaderNav(true);
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      setDevice('Android');
      localStorage.setItem('deviceType', 'Android');
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDevice('iPhone');
      localStorage.setItem('deviceType', 'iPhone');
    } else {
      setDevice('Unknown or not Mobile');
      localStorage.setItem('deviceType', 'Unknown');
    }
    setLoaderNav(false);
  };

  const getOrderStatusApi = async (orderId) => {
    const base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
    const apiLink = `${base_url}/api/v1/order/getOrderStatus`;
    const orderid = orderId;

    let { data } = await axios.post(apiLink, { orderid: orderid });
    const { data2, error2 } = await supabase
      .from('users')
      .update({
        status: data.data.status == 'CHARGED' ? true : false,
      })
      .eq('mobile', localStorage.getItem('mobile'))
      .select();

    if (data.data.status != 'CHARGED') {
      navigate('/payment');
    } else {
      navigate('/');
    }
  };

  async function insertData(data) {
    let { data: users, errorCheck } = await supabase
      .from('users')
      .select('*')
      .eq('mobile', data.mobile);

    // if (users.length) {
    //   sessionStorage.setItem('mobile', users[0].mobile);
    //   localStorage.setItem('mobile', users[0].mobile);
    //   localStorage.setItem('orderId', users[0].order_id);
    //   let ordrId = users[0].order_id;
    //   await getOrderStatusApi(ordrId);
    // }

    // if (users.length) {
    //   if (users[0]?.score == '0' && users[0]?.status == true) {
    //     console.log('checkinside', 'fintthem');
    //     sessionStorage.setItem('mobile', users[0].mobile);
    //     localStorage.setItem('mobile', users[0].mobile);
    //     localStorage.setItem('orderId', users[0].order_id);
    //     navigate('/');
    //     setMainLoader(false);
    //     return '';
    //   }
    // }

    if (!users.length || !users[0]?.order_id) {
      // Insert a new row

      const { output, errorInsert } = await supabase
        .from('users')
        .insert([{ name: data.name, email: data.email, mobile: data.mobile }])
        .select();

      // console.log(output);
      callOrderData();
      sessionStorage.setItem('mobile', data.mobile);
      localStorage.setItem('mobile', data.mobile);
    } else {
      const orderData = users[0].order_id;

      const score = users[0].score;

      sessionStorage.setItem('mobile', users[0].mobile);
      localStorage.setItem('mobile', users[0].mobile);
      if (orderData && score == 0) {
        await getOrderStatusApi(orderData);
      }
      // console.log(users[0], 'testing data check qc');
      // if (!users[0].status) {
      //   sessionStorage.setItem('mobile', users[0].mobile);
      //   localStorage.setItem('mobile', users[0].mobile);
      //   callOrderData(users[0].order_id);
      //   // sessionStorage.setItem('orderId', users[0].order_id);
      //   // localStorage.setItem('orderId', users[0].order_id);
      //   // localStorage.setItem('gameLink', 0);
      //   // navigate('/payment');
      // } else {
      alert('number already exists');
      setMainLoader(false);
      // }
    }

    // console.log(users, 'data');
  }

  // React.useEffect(() => {
  //   window.location.reload();
  // }, []);

  React.useState(() => {
    getDeviceData();
    localStorage.setItem('gameLink', 0);
    localStorage.removeItem('orderId');
    localStorage.getItem('mobile');
    sessionStorage.removeItem('tr');
    sessionStorage.removeItem('merchant_name');
    sessionStorage.removeItem('merchant_vpa');
    sessionStorage.removeItem('amount');
    sessionStorage.removeItem('mcc');
  }, []);

  return loaderNav ? (
    <>...loading</>
  ) : (
    <div>
      <div>Device:{device}</div>
      <section
        className=" text-white"
        // style={{ display: `${showQuiz ? 'none' : 'block'}` }}
        style={{ backgroundColor: '#FDDB4D' }}
      >
        <div className="container">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-lg-8">
              <div
                className="card p-4"
                style={{ background: '#3d3d3d', borderColor: '#646464' }}
              >
                <h2 className="text-center text-white mb-4">
                  User Information
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      name="name"
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number (10 digits)
                    </label>
                    <input
                      name="mobile"
                      onChange={handleChange}
                      type="tel"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={mainLoader}
                  >
                    {mainLoader ? '...loading' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterDetails;
