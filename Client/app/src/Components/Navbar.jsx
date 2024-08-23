// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h1>Κάτι να'χεις να διαβάζεις</h1>
//       <h1 className="welcome"> Hello <span>{localStorage.getItem("user")}</span> </h1>
//       <button className="logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Κάτι να'χεις να διαβάζεις</h1>
      <div className="nav-links">
        {token ? (
          <>
            <span className='span'>Hello, {username}</span>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
