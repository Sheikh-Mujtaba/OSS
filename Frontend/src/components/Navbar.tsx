import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is logged in
    axios.get('http://localhost:8082/auth/check-session', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // If session exists, set the user as logged in
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error('Error checking session:', err);
        setIsLoggedIn(false);
      });
  }, []);  // Empty dependency array, so this runs only once after the first render.

  const handleLogout = () => {
    // Call the logout endpoint to destroy the session on the backend
    axios.post('http://localhost:8082/auth/logout', {}, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(false); // Update state to reflect the logged-out state
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <div className="px-[10vw] py-[3vh] bg-[#1B1833] text-white border-b-2">
      <div className="flex items-center justify-between cursor-pointer">
        <Link to='/home'><p className="text-3xl">OSS</p></Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-[4rem] justify-center">
          <p>About</p>
          <p>Videos</p>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#441752] px-5 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className="bg-[#F29F58] px-5 py-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
