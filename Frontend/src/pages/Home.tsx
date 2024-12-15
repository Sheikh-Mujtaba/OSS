import { useState, useEffect } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isExists, setIsExists] = useState<boolean>(false);

  useEffect(() => {
    // Check if session exists and get the user info
    axios.get('http://localhost:8082/auth/check-session', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setUserName(response.data.user.name);
          setIsExists(true); // User is logged in
        } else {
          setIsExists(false); // No session
        }
      })
      .catch((err) => {
        console.log('No session or error fetching session', err);
        setIsExists(false); // If error occurs, assume user is not logged in
      });
  }, []);

  return (
    <div className="h-[90vh] text-white">
      <div className="h-[100%] flex justify-center items-center">
        <div>
          {isExists ? (
            <h1 className="text-4xl capitalize">Welcome {userName}</h1>
          ) : (
            <h1 className='text-4xl capitalize'>Login to see and enter our discussion room</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
