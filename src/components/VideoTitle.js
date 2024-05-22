import React from 'react'

const VideoTitle = ({title,description}) => {
  return (
    // <></>
    <div className='w-full aspect-video pt-[20%] md:px-24 px-6 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-xl md:text-6xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-1/4'>{description}</p>
      <div>
      <button className='bg-gray-500 text-white md:py-4 py-2 mt-2 md:mt-0  md:px-12 px-6 md:text-xl text-lg bg-opacity-50 rounded-lg'>▷ Play</button>
      <button className='bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg mx-2 hidden md:inline-block'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle