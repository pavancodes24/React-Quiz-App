import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate('');
  if (!sessionStorage.getItem('mobile')) {
    navigate('/user-details');
  }
  const { startQuiz, showStart } = useContext(DataContext);
  return (
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
            <h1 className="fw-bold mb-4">Amazon Quiz</h1>
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
