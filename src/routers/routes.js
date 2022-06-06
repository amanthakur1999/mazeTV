import { Routes, BrowserRouter, Navigate } from 'react-router-dom';

import Home from '../components/Home';
import ShowDetail from '../components/ShowDetail';
import Login from '../components/LogIn';
import Signup from '../components/signUp';
import { Route } from 'react-router-dom';
import { useContext } from 'react';
import SessionContext from '../contexts/sessionContext';
import FavShows from '../components/FavShows';

const Routers = () => {
  const { session } = useContext(SessionContext);

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route
            default
            exact
            path="/login"
            element={session.hasSession ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
        </>
        <>
          <Route
            exact
            path="/"
            element={session.hasSession ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/showDetail" element={<ShowDetail />}>
            <Route path=":id" element={<ShowDetail />} />
          </Route>
          <Route exact path="/fav" element={<FavShows />} />
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
