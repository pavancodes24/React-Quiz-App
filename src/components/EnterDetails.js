import React from 'react';

import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  'https://hovpyzfjuyoqjlakwxjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdnB5emZqdXlvcWpsYWt3eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDQxNzAsImV4cCI6MjAyMjEyMDE3MH0.6OmSG6kd5UQFDayTSDADe7CeMN__Wc5Hbk4jWYQsg4c'
);

const EnterDetails = () => {
  const [detail, setDetail] = React.useState({});
  const navigate = useNavigate('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    insertData(detail);
  };

  async function insertData(data) {
    let { data: users, errorCheck } = await supabase
      .from('users')
      .select('*')
      .eq('mobile', data.mobile);

    if (!users.length) {
      // Insert a new row

      const { output, errorInsert } = await supabase
        .from('users')
        .insert([{ name: data.name, email: data.email, mobile: data.mobile }])
        .select();

      // console.log(output);
      sessionStorage.setItem('mobile', data.mobile);
      navigate('/');
    } else {
      alert('number already exists');
    }

    // console.log(users, 'data');
  }
  return (
    <div>
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
                  <button type="submit" className="btn btn-primary">
                    Submit
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
