import React from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { DataProvider } from './context/dataContext';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import EnterDetails from './components/EnterDetails';
import PaymentDetails from './components/PaymentDetails';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/user-details" element={<EnterDetails />} />
        <Route path="/payment" element={<PaymentDetails />} />
        <Route
          path="/"
          element={
            <>
              {/* Welcome Page */}
              <Start />

              {/* Quiz Page */}
              <Quiz />

              {/* Result Page */}
              <Result />
            </>
          }
        />
      </Routes>
    </DataProvider>
  );
}

export default App;
