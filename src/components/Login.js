import React, { useRef, useState } from "react";
import Header from "./Header";
import { validData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser} from '../utils/userSlice'
import { BG_URL } from "../utils/constant";

const Login = () => {
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
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: "https://avatars.githubusercontent.com/u/166325440?v=4",
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
            })
            .catch((error) => {
              setErr(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      //Sing In logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
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
      <div className="relative">
        <img
          src={BG_URL}
          alt="img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/12 text-white rounded-lg bg-opacity-80"
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
          {signIn === true ? "Sign In" : "Sign Up"}
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
