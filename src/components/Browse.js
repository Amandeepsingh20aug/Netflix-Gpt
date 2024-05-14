import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'

import MainContainer from './MainContainer'

const Browse = () => {
useNowPlayingMovies()
  return (
    <div>
    <Header/>
    <MainContainer/>
    {/* MainContainer 
         - Video Background
         - Video title
        Secondary Container
         - MovieList *n
           - Cards * n  
      */
      }
    </div>
  )
}

export default Browse