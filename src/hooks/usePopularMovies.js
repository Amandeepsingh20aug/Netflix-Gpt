import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";

const usePopularMovies = () =>{
  const dispatch = useDispatch();
  const popularMovies = useSelector((store)=>store.movies.popularMovies)
  const getPopularMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',options)

    const json = await data.json(data)

    dispatch((addPopularMovies(json.results)))
  }

  useEffect(()=>{
    !popularMovies && getPopularMovies();
  },[])
}

export default usePopularMovies;