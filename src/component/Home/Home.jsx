import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import Trans from '../Result/Trans';
import axios from 'axios';
import { CircularProgress } from '@mui/material';


function Home() {
  const [videoFile, setVideoFile] = useState(null);
  const [transcriptData, setTranscriptData] = useState([]);
  const [scrollToTranscript, setScrollToTranscript] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const transRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollToTranscript && transRef.current) {
      transRef.current.scrollIntoView({ behavior: 'smooth' });
      setScrollToTranscript(false);
    }
  }, [scrollToTranscript]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      inputRef.current.setCustomValidity('Please choose a video file');
      inputRef.current.reportValidity();
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('video', videoFile);

      // You may need to update the URL to match your server-side video upload endpoint
      const response = await axios.post('https://trans-backend.onrender.com/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
      if (!response) {
        console.log('no data');
      }
      console.log('bro',response.data);
      setTranscriptData(response.data.transcript);
      setScrollToTranscript(true);

      // if (transRef.current) {
      //   setIsLoading(false);
      //   transRef.current.scrollIntoView({ behavior: 'smooth' });
      // }
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }finally {
      setIsLoading(false);
    }
  

  };

  
console.log('m',transcriptData)
  return (
    <div className='container'>
      <img className='img' src='assets/transjpg.jpg' />
      <div className='box'>
        <div className='left'>
          <h1>Video to Transcript</h1>
        </div>
        <div className='right'>
          <form className='form' onSubmit={handleClick}>
            <div className='formInput'>
              <input
                type='file'
                accept='video/*'
                onChange={handleFileChange}
                ref={inputRef}
                required
              />
            </div>
            
            { <div className='formButton'>
            <button type='submit' id='button'>
            {isLoading ? <CircularProgress color='inherit' size={20}/> :  'Get Transcript'}
            </button></div>}
          </form>
        </div>
      </div>
      {transcriptData.length > 0 && (
        <div className='ref' ref={transRef}>
          <Trans transcript={transcriptData} />
        </div>
      )}
    </div>
  );
}

export default Home;
