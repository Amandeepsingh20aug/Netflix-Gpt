import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { options } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchInput = useRef(null);
  
  const SearchMovieTMDB = async (movie) =>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", options);

    const json = await data.json();

    return json.results;
  }

  const handleGptSearch = async () => {
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
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearch}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
