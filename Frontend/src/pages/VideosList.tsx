import React, { useState, useEffect } from 'react';
import { storage } from '../storage/firebase'; // Import the Firebase storage
import { ref, listAll, getDownloadURL } from 'firebase/storage'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import useCheckSession from '../hooks/useCheckSession';

const VideosList: React.FC = () => {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [category ,setCategory]=useState <string>('all')
  const {isLoggedIn,setIsLoggedIn} = useCheckSession ();

 

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const categories = {
          beginner: 'clips/beginner/',
          advanced: 'clips/advanced/',
        };

        let videoRefs = []; // Array to store references for videos

        if (category === 'all') {
          // Fetch all videos from both categories
          const beginnerRef = ref(storage, categories.beginner);
          const advancedRef = ref(storage, categories.advanced);

          const beginnerList = await listAll(beginnerRef);
          const advancedList = await listAll(advancedRef);

          videoRefs = [...beginnerList.items, ...advancedList.items];
        } else {
          // Fetch videos for the selected category
          const categoryRef = ref(storage, categories[category as keyof typeof categories]);
          const categoryList = await listAll(categoryRef);
          videoRefs = categoryList.items;
        }

        // Fetch URLs for the collected video references
        const urlPromises = videoRefs.map((item) => getDownloadURL(item));
        const urls = await Promise.all(urlPromises);

        setVideoUrls(urls); // Set fetched video URLs to state
      } catch (error) {
        console.error('Error fetching video URLs:', error);
      }
    };

    fetchVideoUrls();
  }, [category]);
  

  return (
    <>
   <div className=' px-[4vw] md:px-[10vw] h-auto'>

    {isLoggedIn ? (
    <div className='py-[2rem] flex gap-[2rem] mt-[2rem]'>
      <button className={`px-3 py-2 bg-[#ABC270] text-white rounded ${category === 'all' ? ("bg-gray-500") : ("")}`} onClick={()=>setCategory('all') } >All</button>
      <button className={`px-3 py-2 bg-[#ABC270] text-white rounded ${category === 'beginner' ? ("bg-gray-500") : ("")}`} onClick={() => setCategory('beginner')}>Beginner</button>
      <button className={`px-3 py-2 bg-[#ABC270] text-white rounded ${category === 'advanced' ? ("bg-gray-500") : ("")}`} onClick={()=>setCategory('advanced')}>Advanced</button>

    </div>
    ) : ("")}

  <div className=" grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-[5rem] justify-center items-center p-4">

    {videoUrls.map ((url,index) => (
      <div key={index}>

       {isLoggedIn ? (
         <Link to={`/videos/${category}/${index}`} className=''>
         <video src={url} className='border border-[#ABC270] rounded ' />
         </Link>
        
        
        
       ) : (
        <video src={url} className='border border-[#ABC270] rounded blur' />
       
       )}

      </div>


    ))}


    


  </div>
</div>

    </>
  );
};

export default VideosList;
