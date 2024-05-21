import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { showSignOutPopUp } from "../utils/singoutSlice";

const SingoutPopUp = () => {
  const dispatch = useDispatch();
   const handleSignOut = ()=>{
    signOut(auth).then(() => {
       dispatch(showSignOutPopUp(false))
    }).catch((error) => {
    });
  }
  const closePopUp = () =>{
    dispatch(showSignOutPopUp(false))
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
      <div className="w-[45%]  bg-gray-700 rounded-lg">
        <div>
          <h1 className="text-white text-4xl font-bold text-center my-10">
            Are you sure you want to sign out?
          </h1>
        </div>
        <div className="mt-10">
          <button className="flex justify-center m-auto bg-red-700 text-white p-4 w-1/2 text-2xl rounded-lg" onClick={handleSignOut}>SignOut</button>
        </div>
        <div className="my-5">
          <button className="flex justify-center m-auto bg-black text-white p-4 w-1/2 text-2xl rounded-lg" onClick={closePopUp}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default SingoutPopUp;
