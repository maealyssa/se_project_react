import "../blocks/WeatherCard.css";
import { weatherOptions } from "../utils/constants";

function WeatherCard({ weatherData, weatherDataTemp, currentTemperatureUnit }) {

    const filteredOptions = weatherOptions.filter((option) => {
        return (
            option.day === weatherData.isDay && 
            option.condition === weatherData.condition

        )
    });

    const weatherOptionUrl = filteredOptions[0]?.url;
    const weatherOptionCondition = filteredOptions[0]?.condition;

    return (
        <section className="weather-card">
            <p className="weather-card__temp">{`${weatherDataTemp}°${currentTemperatureUnit}`}</p>
            <img 
                src={weatherOptionUrl} 
                alt={weatherOptionCondition} 
                className="weather-card__image" />
        </section>

    )
}

export default WeatherCard;