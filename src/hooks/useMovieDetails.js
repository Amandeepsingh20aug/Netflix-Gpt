import { useDispatch } from "react-redux";
import { options } from "../utils/constant"
import { addMovieDetails } from "../utils/moviesSlice";

const useMovieDetails = () =>{
  const dispatch = useDispatch();
  const getMovieDetails = async (id) =>{
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);

    const json = await data.json();

    dispatch(addMovieDetails(json))

  }

  return {getMovieDetails}
}

export default useMovieDetails