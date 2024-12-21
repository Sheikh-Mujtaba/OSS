import React, { useState, useEffect } from 'react';
import { storage } from '../storage/firebase'; // Import the Firebase storage
import { ref, listAll, getDownloadURL } from 'firebase/storage'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

const Videos: React.FC = () => {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [sessionExists, setSessionExists] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user session exists
    axios
      .get('http://localhost:8082/auth/check-session', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setSessionExists(true);
        }
      })
      .catch((err) => {
        setSessionExists(false);
      });
  }, []);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        // Reference to the folder containing videos in Firebase Storage
        const videosRef = ref(storage, 'videos/');

        // List all videos in the folder
        const videoList = await listAll(videosRef);

        // Fetch URLs for all videos
        const urls = await Promise.all(
          videoList.items.map((item) => getDownloadURL(item))
        );

        // Update the state with the fetched video URLs
        setVideoUrls(urls);
      } catch (error) {
        console.error('Error fetching video URLs:', error);
      }
    };

    // if (sessionExists) {
    //   fetchVideoUrls();
    // }
    fetchVideoUrls();
  }, []);

  return (
    <>
   <div className={` px-[4vw] md:px-[10vw] ${sessionExists ? ("h-[auto]") : ("h-[100vh]")}`}>

    {sessionExists ? (
    <div className='py-[2rem] flex gap-[2rem] mt-[2rem]'>
      <button className='px-3 py-2 bg-[#ABC270] text-white rounded'>Rolls</button>
      <button className='px-3 py-2 bg-[#ABC270] text-white rounded'>Technique</button>
      <button className='px-3 py-2 bg-[#ABC270] text-white rounded'>Breakdown</button>

    </div>
    ) : ("")}

  <div className="w-[100%] h-[100%] grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 justify-center items-center p-4">
    {videoUrls.map((url, index) => (
      <div key={index} className={`flex bg-black justify-center items-center border h-[15rem] w-[30rem] border border-[#ABC270] ${sessionExists ? ("") : ("blur ")}`}>
        {/* <Link to={`/videos/${index+1}`}> */}
        <video controls={false} className="w-[80%]">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* </Link> */}
      </div>
    ))}


  </div>
</div>

    </>
  );
};

export default Videos;
