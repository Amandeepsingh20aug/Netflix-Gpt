import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';
import MoviePopUp from './MoviePopUp';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className=' bg-black relative'>
    <div className='md:-mt-52 mt-0 md:pl-6 pl-3 relative z-20'>
    <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
    <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
    <MovieList title={'Popular'} movies={movies.popularMovies} />
    <MovieList title={'Upcoming Movies'} movies={movies.upComingMovies} />
    </div>
    </div>
  )
}

export default SecondaryContainer