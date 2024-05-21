import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";

const useTopRatedMovies = () =>{
  const dispatch = useDispatch();
  const topRated = useSelector((store)=>store.movies.topRatedMovies)
  const getTopRatedMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1',options)

    const json = await data.json(data)
    
    dispatch((addTopRatedMovies(json.results)))
  }

  useEffect(()=>{
    !topRated && getTopRatedMovies();
  },[])
}

export default useTopRatedMovies;