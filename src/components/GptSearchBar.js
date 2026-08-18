import geminiModel from "../utils/gemini";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constant";
import { json } from "react-router-dom";
import { addGptMovieResult } from "../utils/gptSlice";


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json()

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // make an API call to Gemini API and get movie results

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Animal, Don, KGF, Golmaal. Do not write any other text or explanation.";

    let gptMovies = [];
    try {
      const result = await geminiModel.generateContent(gptQuery);
      const responseText = result.response.text();
      console.log("Gemini Response:", responseText);
      gptMovies = responseText.split(",").map((movie) => movie.trim());
    } catch (error) {
      console.error("Gemini API Error:", error);
      alert("Gemini API Error: " + error.message);
      return;
    }

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); 
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form 
      className="w-full md:w-1/2 bg-black grid grid-cols-12" 
      onSubmit={(e)=> e.preventDefault()}
      >
        <input
        ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
      
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
