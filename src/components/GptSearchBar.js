import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { options } from "../utils/constant";
import { addGptMovieResult, showSearchSpinner } from "../utils/gptSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const spinner = useSelector((store)=>store.gpt.searchSpinner)
  const searchInput = useRef(null);
  
  const SearchMovieTMDB = async (movie) =>{
    dispatch(showSearchSpinner(true));
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", options);

    const json = await data.json();

    return json.results;
  }

  const handleGptSearch = async () => {
    if(!searchInput.current.value) return 
    const gptQuery =
      "Act as a Movie Recommendation sysytem and suggest some movies for the query :" +
      searchInput.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gaddar, Sholay, Don,Golmaal, Koi Mil Gaya";
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    // if(!gptResult.choices) //To - Do

    const gptMovies = gptResult.choices[0]?.message?.content.split(",");
    
    const data = gptMovies.map((movie)=>(
      SearchMovieTMDB(movie)
    )) 

    const tmdbResults = await Promise.all(data);
    dispatch(addGptMovieResult({movieNames : gptMovies, movieResults : tmdbResults}))
    dispatch(showSearchSpinner(false))
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-black w-1/2 grid grid-cols-12"
      >
        <input
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"
          ref={searchInput}
        />
        <button
          className={!spinner ? "py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3" : "py-2 px-4 m-4 bg-black text-white rounded-lg col-span-3" } disabled={spinner && "true"}
          onClick={handleGptSearch}
        >
         {spinner === false ? lang[language].search : <FontAwesomeIcon icon={faSpinner} spin size="lg" />}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
