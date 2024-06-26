import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from './gptSlice';
import configReducer from './configSlice'
import singOutReducer from './singoutSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies : moviesReducer,
    gpt : gptReducer,
    config : configReducer,
    SignOut : singOutReducer
  },
})

export default appStore