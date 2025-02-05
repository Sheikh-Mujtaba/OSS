import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storage } from '../storage/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import useCheckSession from '../hooks/useCheckSession';

const VideoPlayer: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: 'beginner' | 'advanced' | 'all' }>(); // category can now be 'all'
  const [videoUrl, setVideoUrl] = useState<string | null>(null);


  const {isLoggedIn,setIsLoggedIn} = useCheckSession ();

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const categories = {
          beginner: 'clips/beginner/',
          advanced: 'clips/advanced/',
        };

        // Handle the 'all' category by combining both beginner and advanced categories
        let categoryList: any[] = [];

        if (category === 'all') {
          const beginnerRef = ref(storage, categories.beginner);
          const advancedRef = ref(storage, categories.advanced);
          
          const beginnerList = await listAll(beginnerRef);
          const advancedList = await listAll(advancedRef);

          // Merge both lists for the 'all' category
          categoryList = [...beginnerList.items, ...advancedList.items];
        } else if (category === 'beginner' || category === 'advanced') {
          // Fetch video list from specific category
          const categoryRef = ref(storage, categories[category]);
          const categoryData = await listAll(categoryRef);
          categoryList = categoryData.items;
        }

        // Get the video ID and find the corresponding video
        const videoIndex = parseInt(id || '0');
        if (categoryList[videoIndex]) {
          const url = await getDownloadURL(categoryList[videoIndex]);
          setVideoUrl(url);
        } else {
          console.error('Video not found');
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    if (isLoggedIn && id && category) {
      fetchVideoUrl();
    }
  }, [id, category, isLoggedIn]);

  if (!videoUrl) {
    return <div className='h-[100vh] flex justify-center items-center text-4xl'>Login to view the video </div>;
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-900">
      <video controls controlsList="nodownload" className="w-[60%]">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
