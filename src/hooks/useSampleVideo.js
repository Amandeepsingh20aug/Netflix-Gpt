import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addSampleVideo } from "../utils/moviesSlice";

const useSampleVideo = ()=>{
  const dispatch = useDispatch();
  const getSampleVideo = async(movieId) =>{
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );

    const json = await data.json(data);

    const videos = json.results;

    const trailerVideo = videos.filter((item) => item.type === "Trailer");

    const trailer = trailerVideo.length ? trailerVideo[0] : json.results[0];
      dispatch(addSampleVideo(trailer))
  }

  return {getSampleVideo}
}

export default useSampleVideo