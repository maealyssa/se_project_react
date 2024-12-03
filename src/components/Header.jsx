import { Link } from "react-router-dom";

import "../blocks/Header.css";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.png";
import ToggleSwitch from "./ToggleSwitch";
import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, handleSignin, handleSignup, isLoggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo_date">
        <Link className="header__logo-link" to="/">
          <img className="header__logo-image" src={logo} alt="logo" />
        </Link>
        <p className="header___data-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__user_container">
        <ToggleSwitch />
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
        </ProtectedRoute>

        {isLoggedIn === false && (
          <div>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleSignin}>Log In</button>
          </div>
        )}

        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Link className="header__profile-link" to="/profile">
            <div className="header__user">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt="User's avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </ProtectedRoute>
      </div>
    </header>
  );
}

export default Header;
