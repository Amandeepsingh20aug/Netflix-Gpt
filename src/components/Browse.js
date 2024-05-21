import React, { useEffect, useRef } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovie from "../hooks/useUpcomingMovie";
import { useDispatch, useSelector } from "react-redux";
import GptSearchPage from "./GptSearchPage";
import MoviePopUp from "./MoviePopUp";
import { addMovieDetails, addSampleVideo, showSampleVideoTrailer } from "../utils/moviesSlice";
import { addGptMovieResult } from "../utils/gptSlice";
import SingoutPopUp from "./SingoutPopUp";

const Browse = () => {
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const data = useSelector((store)=>store.movies)
  const {showSampleVideo,sampleVideo,movieDetails} = data
  const SignOut = useSelector((store)=>store.SignOut.signOutPopUp)

  const dispatch = useDispatch();

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovie();

  if(!showGpt){
    dispatch(addGptMovieResult({movieNames : null,  movieResults: null}))
  }


  useEffect(() => {
    if (showSampleVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSampleVideo]);

  const handleClosePopUp = () => {
    dispatch(showSampleVideoTrailer(false));
    dispatch(addSampleVideo(null));
    dispatch(addMovieDetails(null));
  };

  return (
    <div>
      <Header />
      {SignOut && <SingoutPopUp/>}
      {showSampleVideo && <MoviePopUp sampleVideo={sampleVideo} onClose={handleClosePopUp} movieDetails={movieDetails}/>}
      {showGpt ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
