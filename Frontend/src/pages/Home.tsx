import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useCheckSession from '../hooks/useCheckSession';

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [showFaq ,setShowFaq] = useState <boolean>(false);

  const {isLoggedIn,setIsLoggedIn} = useCheckSession ();


  const handleFaq =()=>{
    setShowFaq(!showFaq)
  }

  useEffect(() => {
    // Check if session exists and get the user info
    axios.get('http://localhost:8082/auth/check-session', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setUserName(response.data.user.name);
      
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // No session
        }
      })
      .catch((err) => {
        console.log('No session or error fetching session', err);
        setIsLoggedIn(false); // If error occurs, assume user is not logged in
      });
  }, []);

  return (
    <>

    <div className="h-[90vh] px-[10vw]" >
      <div className="h-[100%] flex justify-start items-center">
        
        <div>
          {isLoggedIn ? (
            <h1 className="text-4xl capitalize">Welcome {userName} </h1>
          ) : (
            <div className='flex flex-col  items-start gap-[2rem]'>
              <h1 className='text-5xl capitalize font-semibold font-mono text-start'>Strategize, customize, and enhance <br/> your grappling skills.</h1>
              <Link to='/register'>
              <button className="bg-[#ABC270] px-[2rem] py-[0.6rem] rounded text-white">
                Register
              </button>
              </Link>
            </div>
          )}
        </div>
       
      </div>
    </div>





    </>
  );
};

export default Home;
