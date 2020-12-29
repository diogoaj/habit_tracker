import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie"


const Header = () => {
  const [loginState, setLoginState] = useState({
    token: false,
  });

  const history = useHistory();
  const token = Cookie.get("token")

  return (
    <header className="bg-blue relative w-100 ph3 pv3 pv4-ns ph4-m ph5-l flex items-center">
        <nav className="f4 fw6 ttu tracked w-50">
            <Link to="/" className="link dim white dib mr3">Habit Tracker</Link>
        </nav>
        <nav className="f6 fw6 ttu tracked w-50">
          {token ? (
            <Link to="/logout">
              <div className="link dim white dib mr3 fr" onClick={() => {
                Cookie.remove("token");
                history.push('/');
                setLoginState({
                  token: false,
                })
              }}>
                logout  
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <div className="link dim white dib mr3 fr">
                login
              </div>
            </Link>
          )}
        </nav>
    </header>
  );
};


export default Header;