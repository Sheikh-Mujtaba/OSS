import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showMenu ,setShowMenu] =useState<boolean>(false);


  const handleMenu = ()=>{
    setShowMenu(!showMenu);
  }

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
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <div className="px-[4vw] md:px-[10vw] py-[3vh]   border-b-2">

      <div className="flex items-center justify-between cursor-pointer">
        <Link to='/home'><p className="text-4xl font-semibold">OSS</p></Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-[4rem] justify-center">
             <Link to='/videos'><p>Video Library</p></Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#FDA769] text-white px-5 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className="bg-[#ABC270] px-5 py-2 rounded text-white">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* desktop menu end  */}



          {/* Mobile Menu */}

          {showMenu  && (
          <div className="flex flex-col items-center gap-[2rem] lg:hidden border absolute bg-[#ABC270] top-[10%] left-[6%] p-[1.4rem] w-[90%]">
       
          <Link to='/videos'><p>Video Library</p></Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#441752] text-white px-5 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className="bg-[#D39D55] px-5 py-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
)}

        {/* mobile menu end  */}


        {/* burger menu icons  */}
        <div className='flex md:hidden' onClick={handleMenu}>
                 {showMenu ?  ( <p className='text-[#F29F58] text-xl'><ImCross /></p>) 
                 : 
                 (<p className='text-[#F29F58] text-xl'> <GiHamburgerMenu /></p>)}
        </div>
        {/* burger menu icons end */}
      </div>

    </div>
  );
};

export default Navbar;
