import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    trailerVideo: null,
    sampleVideo: null,
    showSampleVideo: false,
    movieDetails : null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addSampleVideo: (state, action) => {
      state.sampleVideo = action.payload;
    },
    showSampleVideoTrailer: (state, action) => {
      state.showSampleVideo = action.payload;
    },
    addMovieDetails : (state,action) =>{
      state.movieDetails = action.payload
    }
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
  addSampleVideo,
  showSampleVideoTrailer,
  addMovieDetails
} = moviesSlice.actions;
export default moviesSlice.reducer;
