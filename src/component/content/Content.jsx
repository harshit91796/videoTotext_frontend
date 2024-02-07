import React from 'react'
import './content.css'

function Content({content}) {
    // console.log(content[1] )
    // const joinedContent = content.map((x) => x.subtitle).join('\n');
  return (
    <div className='content'>
    <h1>Transcript</h1>
       {
        content
       }
    </div>
  )
}

export default Content
