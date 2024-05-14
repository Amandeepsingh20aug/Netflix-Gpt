import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";

const useNowPlayingMovies = () =>{
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',options)

    const json = await data.json(data)
    
    dispatch((addNowPlayingMovies(json.results)))
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
}

export default useNowPlayingMovies;