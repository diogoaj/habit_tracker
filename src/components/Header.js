import React from 'react';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue relative w-100 ph3 pv3 pv4-ns ph4-m ph5-l flex items-center">
        <nav className="f4 fw6 ttu tracked w-50">
            <Link to="/" className="link dim white dib mr3">Habit Tracker</Link>
        </nav>
        <nav className="f6 fw6 ttu tracked w-50">
            <Link to="/users" className="link dim white dib mr3 fr">Users</Link>
            <Link to="/calendar" className="link dim white dib mr3 fr">Calendar</Link>
        </nav>
    </header>
  );
};

export default Header;