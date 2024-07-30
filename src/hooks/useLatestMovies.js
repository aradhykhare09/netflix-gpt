import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addLatestMovies } from "../utils/moviesSlice";

const useLatestMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const LatestMovies = useSelector((store) => store.movies.latestMovies);

  const getLatestMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addLatestMovies(json.results));
  };

  useEffect(() => {
   !LatestMovies && getLatestMovies();
  }, []);
};

export default useLatestMovies;