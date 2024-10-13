import React, { useContext, useState } from 'react';

const LocalAuthContext = React.createContext();

function LocalAuthProvider({ children }) {
  const [localAuthTest, setLocalAuthTest] = useState("Local Auth Test");
  const [isLocalLoggedIn, setIsLocalLoggedIn] = useState(false);
  const [localUser, setLocalUser] = useState({name: "Eater, Login or Signup"});
  
  function localLogin(user) {
    setIsLocalLoggedIn(true);
    setLocalUser(user);
  }

  function localLogout() {
    setIsLocalLoggedIn(false);
    setLocalUser({name: "Eater, Login or Signup"});
  }

  const contextValue = {
    isLocalLoggedIn,
    localUser,
    localLogin,
    localLogout,
  };

  return (
    <LocalAuthContext.Provider value={contextValue}>
      {children}
    </LocalAuthContext.Provider>
  );
}

export { LocalAuthContext, LocalAuthProvider };;