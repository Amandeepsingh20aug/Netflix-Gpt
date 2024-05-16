import { useEffect } from "react";
import { addUpComingMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";

const useUpcomingMovie = () =>{
  const dispatch = useDispatch();
  const getUpComingMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1',options)

    const json = await data.json(data)
    
    dispatch((addUpComingMovies(json.results)))
  }

  useEffect(()=>{
    getUpComingMovies();
  },[])
}

export default useUpcomingMovie;