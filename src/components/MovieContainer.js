import React from "react";

const MovieContainer = ({ video }) => {
  return (
    <div className="w-full">
      <iframe
        src={`https://www.youtube.com/embed/${video}`}
        title="THE GODFATHER | 50th Anniversary Trailer | Paramount Movies"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-80 aspect-video p-2"
      ></iframe>
    </div>
  );
};

export default MovieContainer;
