import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () =>{
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center p-2">
          {showGptSearch && (
            <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option> ))}
            </select>)}
          <button className="py-1 px-4 mx-4 my-2 bg-white text-black rounded-lg"
          onClick={handleGptSearchClick}
          >
            {showGptSearch? "HomePage": "GPT Search"} 
            </button>
          <img
            className="w-8 h-8"
            alt="usericon"
            src="https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"
          />
          <button onClick={handleSignOut} className="ml-2 font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

