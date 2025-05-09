import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="medibooklogo.png" className="logo-img"/> 
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/">Login</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/register">Registro</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
