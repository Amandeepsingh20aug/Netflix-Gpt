import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";


const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId)
  const fetchTrailer = useSelector((store)=>store.movies.trailerVideo)
  
  return (
    // <></>
    <div className="w-full">
      <iframe
        className="w-[100%] aspect-video"
        src={`https://www.youtube.com/embed/${fetchTrailer?.key}?autoplay=1&mute=1&si=DXNLtGHKPFS32QOx`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
