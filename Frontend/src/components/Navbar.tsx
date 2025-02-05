import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import useCheckSession from '../hooks/useCheckSession';

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const {isLoggedIn,setIsLoggedIn} = useCheckSession ();


  const handleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };


  const handleLogout = () => {
    axios
      .post('http://localhost:8082/auth/logout', {}, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <div className="px-[4vw] md:px-[10vw] py-[3vh] border-b-2">
      <div className="flex items-center justify-between cursor-pointer">
        <Link to="/home">
          <p className="text-4xl font-semibold">OSS</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-[4rem] justify-center">
          <Link to="/videos">
            <p>Video Library</p>
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              {/* Profile Icon Button */}
              <button
                onClick={handleProfile}
                className="text-2xl text-[#ABC270] focus:outline-none"
              >
                <CgProfile />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 left-[0%] mt-2 w-[10rem] bg-white border border-gray-300 rounded shadow-lg z-10">
                  <ul className="py-1 text-left">
                    <Link to='/settings'>
                    <li className="px-4 py-2  hover:bg-gray-300 cursor-pointer text-black">
                      Account Settings
                    </li>
                    </Link>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-black"
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-[#ABC270] px-5 py-2 rounded text-white">
                Login
              </button>
            </Link>
          )}
        </div>
        {/* Desktop Menu End */}

        {/* Mobile Menu */}
        {showMenu && (
          <div className="flex flex-col items-center gap-[2rem] lg:hidden border absolute bg-[#ABC270] top-[10%] left-[6%] p-[1.4rem] w-[90%]">
            <Link to="/videos">
              <p>Video Library</p>
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#441752] text-white px-5 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-[#D39D55] px-5 py-2 rounded">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}
        {/* Mobile Menu End */}

        {/* Burger Menu Icons */}
        <div className="flex md:hidden" onClick={handleMenu}>
          {showMenu ? (
            <p className="text-[#F29F58] text-xl">
              <ImCross />
            </p>
          ) : (
            <p className="text-[#F29F58] text-xl">
              <GiHamburgerMenu />
            </p>
          )}
        </div>
        {/* Burger Menu Icons End */}
      </div>
    </div>
  );
};

export default Navbar;
