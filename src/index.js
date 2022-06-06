import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './stylesheet/style.css';
import SessionContext from './contexts/sessionContext';
import Router from './routers/routes';

const App = () => {
  const [session, setSession] = useState({ hasSession: false, username: null });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <Router />
    </SessionContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
