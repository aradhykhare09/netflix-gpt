import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const TopRatedMovies = useSelector((store) => store.movies.topratedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
   !TopRatedMovies &&  getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;