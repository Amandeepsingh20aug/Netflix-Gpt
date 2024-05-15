import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constant';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const data = useSelector((store)=> store.user)
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


  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between'>
    <img className='w-44' src={LOGO} alt='img'/>
    {data != null && <div className='flex p-2'>
      <img alt='userIcon' className='w-12 h-12' src={data?.photoURL}/>
      <button className='font-bold text-white' onClick={handleSignOut}>(Sign Out)</button>
    </div>}
    </div>
  )
}

export default Header