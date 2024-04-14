import { data } from "autoprefixer";
import React, {useState, useEffect} from "react";

function HourlyWeatherCard({data, measurementType, setMeasurementType, handleSubmit}){

    let hour = data.dt_txt.substring(11,13)
    const signifier = hour >= 12 ? 'PM' : 'AM';

    hour = ((data.dt_txt.substring(11,13)) % 12 || 12) + ":00 " + signifier;

    return (
        <div class = " w-1/6 h-full backdrop-blur-md border-white border-opacity-25 border-[1px] rounded-xl flex flex-col items-center mx-2 text-white">
            <p class = "mt-3">{hour}</p>
            <img class = "w-3/4 mt-2" src = {"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}/>
            <button
                class = " text-lg"
                onClick={(e)=> {
                    setMeasurementType(measurementType == "F" ? "C" : "F");
                    handleSubmit(e);
                  }}
            >{data.main.temp + "°" + measurementType}</button>
        </div>
    );
}
export default HourlyWeatherCard;