import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name : 'gpt',
  initialState : {
    showGptSearch : false,
    movieResults : null,
    movieNames : null,
    searchSpinner : false,
  },
  reducers : {
    toogleGptSearchView : (state,action) =>{
     state.showGptSearch = !state.showGptSearch
    },
    addGptMovieResult : (state,action) =>{
      const {movieNames , movieResults} = action.payload
      state.movieNames = movieNames
      state.movieResults = movieResults
    },
    showSearchSpinner : (state,action) =>{
      state.searchSpinner = action.payload
    }
  }
})

export const {toogleGptSearchView,addGptMovieResult,showSearchSpinner} = gptSlice.actions;
export default gptSlice.reducer