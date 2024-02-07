import React from 'react'
import './trans.css'

import Content from '../content/Content'
import { GitHub } from '@mui/icons-material'
import { Link } from 'react-router-dom'


function Trans({transcript}) {
  console.log('hii',transcript)
  return (
    <div className='transContainer'>
      <div className="home">
        <span className='homeText'>Source code</span>
         <div className="icon">
         <a href='https://github.com/harshit91796/videoTotext_frontend' className='gitHublink'><GitHub color='white' fontSize='large'  className='git'/></a>
          <span>Frontend</span>
         </div>
         <div className="icon">
         <a href='https://github.com/harshit91796/videoTotext_backend' className='gitHublink'><GitHub fontSize='large' color='white'  className='git'/></a>
           <span>Backend</span>
         </div>
        
      </div>
     <div className="transContent">
       
         <Content content={transcript}/>
     </div>
      
     
    </div>
  )
}

export default Trans
