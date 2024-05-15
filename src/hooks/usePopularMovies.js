import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";

const usePopularMovies = () =>{
  const dispatch = useDispatch();
  const getPopularMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',options)

    const json = await data.json(data)

    dispatch((addPopularMovies(json.results)))
  }

  useEffect(()=>{
    getPopularMovies();
  },[])
}

export default usePopularMovies;