import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constant';
import { toogleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const data = useSelector((store)=> store.user)
  const showGpt = useSelector((store)=>store.gpt.showGptSearch)
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  useEffect(()=>{
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid, email:email , displayName : displayName , photoURL : photoURL}));
        navigate('/browse')
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    // Unsubscribe when component Unmounts
    return () => unsubscribe();
  },[])

  const handleGptSearch = () =>{
    dispatch(toogleGptSearchView())
  }

  const handleLanguageChange = (e) =>{
     dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between'>
    <img className='w-44' src={LOGO} alt='img'/>
    {data != null && <div className='flex p-2'>
     {showGpt && <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang)=>(
       <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
      ))}
      </select>}
      <button className='py-2 mx-4 px-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearch}>{!showGpt ? 'GPT Search' : 'Browse'}</button>
      <img alt='userIcon' className='w-12 h-12' src={data?.photoURL}/>
      <button className='font-bold text-white' onClick={handleSignOut}>(Sign Out)</button>
    </div>}
    </div>
  )
}

export default Header