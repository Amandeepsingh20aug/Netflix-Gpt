import React from 'react'

const MovieDetails = ({title,overview}) => {
  return (
    <div className='pl-2 pr-2 w-full mb-2'>
      <h2 className='text-white text-3xl font-bold'>{title}</h2>
      <p className='text-black text-xl font-semibold my-2'>{overview}</p>
    </div>
  )
}

export default MovieDetails