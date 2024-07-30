import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useLatestMovies from "../hooks/useLatestMovies";


const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  useLatestMovies();
  

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
          MainContainer
            - VideoBackground
            - Videotitle
          SecondaryCnntainer
            - Movielist * n
            - cards * n            
      
          */}
    </div>
  );
};

export default Browse;