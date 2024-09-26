import { useContext, useState } from "react";

import "../blocks/ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../utils/CurrentTemperatureUnitContext";

function ToggleSwitch(){
    const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext)

    return (
        <label className="switch" htmlFor="">
            <input 
                className="switch__box" 
                type="checkbox"
                onChange={handleToggleSwitchChange}
            />
            <span className={
                currentTemperatureUnit === 'F' 
                ? "switch__slider switch__slider-F" 
                : "switch__slider switch__slider-C"}
            ></span>
            <p className={`switch__temp-F ${currentTemperatureUnit === 'F' && "switch__active"}`}>F</p>
            <p className={`switch__temp-C ${currentTemperatureUnit === 'C' && "switch__active"}`}>C</p>
        </label>
    )
}

export default ToggleSwitch;