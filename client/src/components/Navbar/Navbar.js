import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai'; // Import the logout icon
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect the user to the login page or any other desired page
    navigate('/register'); 
  };

  return (
    <nav className="navbar" style={{ marginBottom: 0 }}>
      <div className="left-content">
        <div className="logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9bvxoM7j90GcVA9vGRocOsdkix7jsnNHEtw&usqp=CAU" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
      <div className="Profile">
        {/* Attach the handleLogout function to the onClick event */}
        <AiOutlineLogout onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;






