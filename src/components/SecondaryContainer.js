import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';
import MoviePopUp from './MoviePopUp';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className=' bg-black relative'>
    <div className='-mt-52 pl-6 relative z-20'>
    <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
    <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
    <MovieList title={'Popular'} movies={movies.popularMovies} />
    <MovieList title={'Upcoming Movies'} movies={movies.upComingMovies} />
    </div>
    </div>
  )
}

export default SecondaryContainer