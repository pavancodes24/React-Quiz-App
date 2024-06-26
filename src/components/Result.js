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

  const navigate = useNavigate();

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

              <button
                onClick={() => {
                  sessionStorage.removeItem('mobile');
                  localStorage.removeItem('mobile');
                  sessionStorage.removeItem('orderId');
                  localStorage.removeItem('orderId');
                  sessionStorage.removeItem('walletLink');
                  localStorage.removeItem('gameLink');
                  setTimeout(() => {
                    navigate('/user-details');
                  }, 1000);
                }}
                className="btn py-2 px-4 btn-light fw-bold d-inline"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
