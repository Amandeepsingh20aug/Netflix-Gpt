import { useDispatch, useSelector } from 'react-redux';
import useSampleVideo from '../hooks/useSampleVideo';
import { IMG_CDN_URL } from '../utils/constant'
import { showSampleVideoTrailer } from '../utils/moviesSlice';
import useMovieDetails from '../hooks/useMovieDetails';
const MovieCard = ({posterpath,id}) => {
  const dispatch = useDispatch();
  const {getSampleVideo} = useSampleVideo();
  const {getMovieDetails} = useMovieDetails();
  const handleClick = () => {
    getSampleVideo(id);
    getMovieDetails(id);
    dispatch(showSampleVideoTrailer(true))
  };

  if(!posterpath) return null;
  return (
    <div className='md:w-48 w-36 pr-4 cursor-pointer'>
      <img alt='Poster' src={IMG_CDN_URL + posterpath} onClick={handleClick}/>
      <div className='absolute'>
      </div>
    </div>
  )
}

export default MovieCard