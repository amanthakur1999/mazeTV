import React from 'react';

const SessionContext = React.createContext({
  hasSession: false,
  username: null,
});

export default SessionContext;
