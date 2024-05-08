import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://hovpyzfjuyoqjlakwxjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdnB5emZqdXlvcWpsYWt3eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDQxNzAsImV4cCI6MjAyMjEyMDE3MH0.6OmSG6kd5UQFDayTSDADe7CeMN__Wc5Hbk4jWYQsg4c'
);

const Start = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate('');
  if (!sessionStorage.getItem('mobile') && !localStorage.getItem('mobile')) {
    navigate('/user-details');
  }
  const { startQuiz, showStart } = useContext(DataContext);
  const getOrderStatusApi = async () => {
    setLoading(true);
    const base_url = `https://quizbackend-48178f0f17c2.herokuapp.com`;
    const apiLink = `${base_url}/api/v1/order/getOrderStatus`;
    const orderid = localStorage.getItem('orderId');

    let { data } = await axios.post(apiLink, { orderid: orderid });
    console.log(data.data.status, 'testingdatadata');
    const { data2, error2 } = await supabase
      .from('users')
      .update({
        status: data.data.status == 'CHARGED' ? true : false,
      })
      .eq('mobile', localStorage.getItem('mobile'))
      .select();

    if (data.data.status != 'CHARGED') {
      navigate('/payment');
      setLoading(false);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getOrderStatusApi();
  }, []);
  return loading ? (
    <>...loading</>
  ) : (
    <section
      className="text-white text-center"
      style={{
        display: `${showStart ? 'block' : 'none'}`,
        backgroundColor: '#FDDB4D',
      }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-4 text-dark">Amazon Pay Quiz</h1>
            <button
              onClick={startQuiz}
              className="btn px-4 py-2 bg-light text-dark fw-bold"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
