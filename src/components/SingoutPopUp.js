import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { showSignOutPopUp } from "../utils/singoutSlice";
import { showSearchSpinner } from "../utils/gptSlice";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingoutPopUp = () => {
  const spinner = useSelector((store)=>store.gpt.searchSpinner)
  const dispatch = useDispatch();
   const handleSignOut = ()=>{
    dispatch(showSearchSpinner(true))
    signOut(auth).then(() => {
       dispatch(showSearchSpinner(false))
       dispatch(showSignOutPopUp(false))
    }).catch((error) => {
    });
  }
  const closePopUp = () =>{
    dispatch(showSignOutPopUp(false))
  }
  return (
    <div className="fixed inset-0 flex md:items-center items-end justify-center z-40 bg-black bg-opacity-50">
      <div className="md:w-[45%] w-full  bg-gray-700 rounded-lg bg-opacity-90">
        <div>
          <h1 className="text-white md:text-4xl text-xl font-bold text-center my-10">
            Are you sure you want to sign out?
          </h1>
        </div>
        <div className="mt-10">
          <button className="flex justify-center m-auto bg-red-700 text-white p-4 w-1/2 md:text-2xl text-lg rounded-lg" onClick={handleSignOut}>{!spinner ? 'SignOut' : <FontAwesomeIcon icon={faSpinner} spin size="lg" />}</button>
        </div>
        <div className="my-5">
          <button className="flex justify-center m-auto bg-black text-white p-4 w-1/2 md:text-2xl text-lg rounded-lg" onClick={closePopUp}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default SingoutPopUp;
