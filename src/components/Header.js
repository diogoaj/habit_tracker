import React from 'react';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  return (
    <header className="bg-black-90 relative w-100 ph3 pv3 pv4-ns ph4-m ph5-l db">
        <nav className="f6 fw6 ttu tracked db">
            <Link to="/" className="link dim white dib mr3">Home</Link>
            <Link to="/users" className="link dim white dib mr3">Users</Link>
        </nav>
    </header>
  );
};

export default Header;