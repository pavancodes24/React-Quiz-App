import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/dataContext';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  'https://hovpyzfjuyoqjlakwxjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdnB5emZqdXlvcWpsYWt3eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDQxNzAsImV4cCI6MjAyMjEyMDE3MH0.6OmSG6kd5UQFDayTSDADe7CeMN__Wc5Hbk4jWYQsg4c'
);

const Result = () => {
  const { showResult, quizs, marks, startOver } = useContext(DataContext);

  // hello

  const [seconds, setSeconds] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds == 0) {
          navigate('/user-details');
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  //
  console.log(marks, 'testingonitquiz', quizs);

  async function updateMarks() {
    const { data2, error2 } = await supabase
      .from('users')
      .update({ score: marks / 5 })
      .eq('mobile', sessionStorage.getItem('mobile'))
      .select();
  }

  if (marks) {
    updateMarks();
  }

  return (
    <section
      className=" text-white"
      style={{
        display: `${showResult ? 'block' : 'none'}`,
        backgroundColor: '#FDDB4D',
      }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div
              className={`text-light text-center p-5 rounded ${
                marks / 5 == 3 ? 'bg-success' : 'bg-danger'
              }`}
            >
              <h1 className="mb-2 fw-bold">
                {marks / 5 == 3 ? 'Congratulations!' : 'Oops!'}
              </h1>
              <h3 className="mb-3 fw-bold">
                Your score is {marks / 5} / {quizs.length}
              </h3>

              {/* <button
                onClick={() => {
                  sessionStorage.removeItem('mobile');

                  startOver();
                  // window.location.reload();
                }}
                className="btn py-2 px-4 btn-light fw-bold d-inline"
              >
                Start Over
              </button> */}

              <h1>Countdown: {seconds} seconds</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
