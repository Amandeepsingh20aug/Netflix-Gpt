import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const[signIn,setSignIn] = useState(true)

  const toogleSignInForm = () =>{
   setSignIn(!signIn);
  }
  return (
    <div>
    <Header/>
    <div className='relative'>
      <img src='https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='img'/>
    </div>
    <form className='p-12 bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/12 text-white rounded-lg bg-opacity-80'>
    <h1 className='font-bold text-3xl p-2 my-2'>{signIn === true ? 'Sign In' : 'Sign Up'}</h1>
    {signIn === false && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-600'/>}
      <input type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-600'/>
      <input type='password' placeholder='Password' className='p-4 my-4 w-full  bg-gray-600'/>
      <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{signIn === true ? 'Sign In' : 'Sign Up'}</button>
      <p className='py-4 cursor-pointer' onClick={toogleSignInForm}>{signIn === true ? 'New to Netflix? Sign Up Now' : 'Already registerd? Sign In Now'}</p>
    </form>
    </div>
  )
}

export default Login