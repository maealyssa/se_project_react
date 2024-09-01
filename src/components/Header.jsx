import "../blocks/Header.css"
import logo from "../assets/logo.svg"
import avatar from "../assets/avatar.png"

function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="logo" />
            <p className="header___data-and-location">{currentDate}, {weatherData.city}</p>
            <button 
                className="header__add-clothes-btn"
                type="button"
                onClick={handleAddClick}
            >
                + Add clothes
            </button>
            <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
            </div>
        </header>
    )
}

export default Header