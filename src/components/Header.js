import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie"

const Header = (props) => {
  const history = useHistory();

  return (
    <header className="bg-blue relative w-100 ph3 pv3 pv4-ns ph4-m ph5-l flex items-center">
        <nav className="f4 fw6 ttu tracked w-50">
            <Link to="/" className="link dim white dib mr3">Habit Tracker</Link>
        </nav>
        <nav className="f6 fw6 ttu tracked w-50">
          {props.token ? (
            <Link to="/logout" 
                  className="link dim white dib mr3 fr"
                  onClick={() => {
                            Cookie.remove("token");
                            history.push('/');
                            props.userHandler({token: Cookie.get("token")});
                          }}>
              logout
            </Link>
          ) : (
            <Link to="/login" className="link dim white dib mr3 fr">
              login
            </Link>
          )}
        </nav>
    </header>
  );
};


export default Header;