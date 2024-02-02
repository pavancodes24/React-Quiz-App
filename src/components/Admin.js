import React from 'react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hovpyzfjuyoqjlakwxjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdnB5emZqdXlvcWpsYWt3eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDQxNzAsImV4cCI6MjAyMjEyMDE3MH0.6OmSG6kd5UQFDayTSDADe7CeMN__Wc5Hbk4jWYQsg4c'
);

const Admin = () => {
  const [countries, setCountries] = useState([]);
  const [show, setShow] = React.useState(false);
  const [pass, setPass] = React.useState('');
  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    sessionStorage.removeItem('mobile');

    let { data: users, error } = await supabase.from('users').select('*');
    setCountries(users);
  }

  return !show ? (
    <section className=" text-white" style={{ backgroundColor: '#FDDB4D' }}>
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4"
              style={{ background: '#3d3d3d', borderColor: '#646464' }}
            >
              <h2 className="text-center text-white mb-4">Enter Password</h2>
              <div className="table-responsive">
                <div>
                  <input
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="enter password"
                  />
                  <button
                    onClick={() => {
                      if (pass === 'admin') {
                        setShow(!show);
                      }
                    }}
                  >
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>
      <section className=" text-white" style={{ backgroundColor: '#FDDB4D' }}>
        <div className="container">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-lg-8">
              <div
                className="card p-4"
                style={{ background: '#3d3d3d', borderColor: '#646464' }}
              >
                <h2 className="text-center text-white mb-4">User Details</h2>
                <div className="table-responsive">
                  <table className="table table-striped table-dark table-sm">
                    <thead>
                      <tr>
                        <th scope="col">name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile </th>
                        <th scope="col">Score </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map over userData array and display each user's details in a row */}
                      {countries.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>{user.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
