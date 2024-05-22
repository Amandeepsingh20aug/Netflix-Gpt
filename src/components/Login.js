import React, { useRef, useState } from "react";
import Header from "./Header";
import { validData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser} from '../utils/userSlice'
import { BG_URL, USER_AVATAR } from "../utils/constant";
import { showSearchSpinner } from "../utils/gptSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const spinner = useSelector((store)=>store.gpt.searchSpinner);
  const [signIn, setSignIn] = useState(true);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const nameValue = signIn === false ? name.current.value : "";
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const message = validData(emailValue, passwordValue, signIn, nameValue);
    setErr(message);

    if (message) return;

    if (signIn === false) {
      //Sign Up logic
      dispatch(showSearchSpinner(true))
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              dispatch(showSearchSpinner(false))
            })
            .catch((error) => {
              setErr(error.message);
            });
        })
        .catch((error) => {
          dispatch(showSearchSpinner(false))
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      //Sing In logic
      dispatch(showSearchSpinner(true))
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(showSearchSpinner(false))
        })
        .catch((error) => {
          dispatch(showSearchSpinner(false))
          const errorCode = error.code;
          const errorMessage = error.message;
          setErr("Invalid Credentials");
        });
    }
  };

  const toogleSignInForm = () => {
    setSignIn(!signIn);
  };
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <div className="relative ">
        <img
          className="w-screen h-screen object-cover"
          src={BG_URL}
          alt="img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/12 text-white rounded-lg bg-opacity-80 w-full"
      >
        <h1 className="font-bold text-3xl p-2 my-2">
         {signIn === true ? "Sign In" : "Sign Up"}
        </h1>
        {signIn === false && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-600"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full  bg-gray-600"
        />
        <p className="text-red-500 font-bold text-lg py-2">{err}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
         { !spinner ? signIn === true ? "Sign In" : "Sign Up" : <FontAwesomeIcon icon={faSpinner} spin size="lg" /> }
        </button>
        <p className="py-4 cursor-pointer" onClick={toogleSignInForm}>
          {signIn === true
            ? "New to Netflix? Sign Up Now"
            : "Already registerd? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
