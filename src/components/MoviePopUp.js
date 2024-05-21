import React from "react";
import MovieContainer from "./MovieContainer";
import MovieDetails from "./MovieDetails";

const MoviePopUp = ({ sampleVideo, onClose, movieDetails }) => {
  if (sampleVideo === null) return;
  if (movieDetails === null) return;
  const { original_title, overview } = movieDetails;
  const handleClickOutside = (e) => {
    if (!e.target.closest(".popup-content")) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="w-[40%] bg-gray-400 popup-content">
        <MovieContainer video={sampleVideo?.key} />
        <MovieDetails title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default MoviePopUp;
