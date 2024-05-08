import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Quiz = () => {
  const {
    showQuiz,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
  } = useContext(DataContext);

  // console.log(question, 'question');
  const [seconds, setSeconds] = React.useState(29);
  const [change, setChange] = React.useState(false);

  React.useEffect(() => {
    // console.log(questionIndex, 'finaleindex');

    if (showQuiz) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (quizs.indexOf(question) + 1 == 3) {
            showTheResult();
            return;
          }
          if (prevSeconds == 0) {
            if (quizs.indexOf(question) + 1 == 3) {
              showTheResult();
              return;
            }

            // console.log(
            //   'yesdone',
            //   quizs.length,
            //   Quiz.length,
            //   quizs.indexOf(question) + 1
            // );
            else {
              nextQuestion();
              return 29;
            }
          }
          return prevSeconds - 1;
        });
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(timer);
    }
  }, [showQuiz, questionIndex]);

  // console.log(seconds, 'timer');
  return (
    <section
      className=" text-white"
      style={{
        display: `${showQuiz ? 'block' : 'none'}`,
        backgroundColor: '#FDDB4D',
      }}
    >
      <div className="container">
        <div className="text-black">
          <div
            style={{
              display: 'flex',
              gap: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <img src="/stopwatch.png" alt="" width={'30'} height={'30'} />
            </div>
            {<div>00:{seconds}</div>}
          </div>
        </div>
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4"
              style={{ background: '#3d3d3d', borderColor: '#646464' }}
            >
              <div className="d-flex justify-content-between gap-md-3">
                <h5 className="mb-2 fs-normal lh-base">{question?.question}</h5>
                <h5
                  style={{
                    color: '#60d600',
                    width: '100px',
                    textAlign: 'right',
                  }}
                >
                  {quizs.indexOf(question) + 1} / {quizs?.length}
                </h5>
              </div>
              <div>
                {question?.options?.map((item, index) => (
                  <button
                    key={index}
                    className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                      correctAnswer === item && 'bg-success'
                    }`}
                    onClick={(event) => checkAnswer(event, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {questionIndex + 1 !== quizs.length ? (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={() => {
                    nextQuestion();
                    setChange(!change);
                    setSeconds(9);
                  }}
                  disabled={!selectedAnswer}
                >
                  Next Question
                </button>
              ) : (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={showTheResult}
                  disabled={!selectedAnswer}
                >
                  Show Result
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
