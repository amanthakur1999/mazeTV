import React from 'react';
import Home from './Home';
import ShowDetail from './ShowDetail';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
const App = () => {
  return (
    <>
      {
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/showDetail" element={<ShowDetail />}>
              <Route path=":id" element={<ShowDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      }
    </>
  );
};

export default App;
