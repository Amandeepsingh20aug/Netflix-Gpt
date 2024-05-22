import React, { useState } from 'react';

const MovieDetails = ({ title, overview }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='pl-2 pr-2 w-full mb-2'>
      <h2 className='text-white md:text-3xl text-xl font-bold'>{title}</h2>
      {overview && <button className='bg-red-600 text-white md:text-xl text-lg font-semibold p-2 rounded-lg my-2' onClick={toggleExpansion}>{!expanded ? 'Expand' : 'Collapse'}</button>}
      {expanded ? (
        <p
          className='text-black md:text-xl text-lg font-semibold my-2'
        >
          {overview}
        </p>
      ) : (
        <p
          className='text-black md:text-xl text-lg font-semibold my-2 truncate'
        >
          {overview}
        </p>
      )}
    </div>
  );
};

export default MovieDetails;
