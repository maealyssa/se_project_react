import "../blocks/Header.css"
import logo from "../assets/logo.svg"
import avatar from "../assets/avatar.png"
import ToggleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <header className="header">
            <div className="header__logo_date">
                <img className="header__logo-image" src={logo} alt="logo" />
                <p className="header___data-and-location">
                    {currentDate}, {weatherData.city}
                </p>
            </div>
            <div className="header__user_container">
                <ToggleSwitch />
                <button 
                    className="header__add-clothes-btn"
                    type="button"
                    onClick={handleAddClick}
                >
                    + Add clothes
                </button>
                <div className="header__user">
                    <p className="header__username">Terrence Tegegne</p>
                    <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
                </div>
            </div>
        </header>
    )
}

export default Header
