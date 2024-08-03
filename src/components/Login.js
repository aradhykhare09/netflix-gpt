import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR, LOGO, BG_URL } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message); 
    if (message) return; 
    
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({
              uid,
              email,
              displayName,
              photoURL,
            }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }));
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL}
          alt="background"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
