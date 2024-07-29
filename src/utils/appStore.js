import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import moviesreducer from "./moviesSlice";


const appStore = configureStore(
  {
    reducer: {
      user: userReducer,
      movies: moviesreducer,
    },
  }
);

export default appStore;
