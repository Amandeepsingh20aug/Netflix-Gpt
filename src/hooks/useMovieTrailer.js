import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) =>{
  const dispatch = useDispatch();
  const trailer = useSelector((store)=>store.movies.trailerVideo)

  //Fetching the trailer video and updating the store with trailer video data.
  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );

    const json = await data.json(data);

    const videos = json.results;

    const trailerVideo = videos.filter((item) => item.type === "Trailer");

    const trailer = trailerVideo.length ? trailerVideo[0] : json.results[0];
      dispatch(addTrailerVideo(trailer))
  };

  useEffect(() => {
    !trailer && getMovieTrailer();
  }, []);


}


export default useMovieTrailer