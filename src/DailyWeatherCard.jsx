import React,  {useState} from 'react';

function DailyWeatherCard({data, measurementType, setMeasurementType, handleSubmit}) {
    return (
        <div class = " w-4/5 backdrop-blur-md border-white border-opacity-25 border-[1px] rounded-xl flex flex-row items-center m-2 text-white bg-slate-700 bg-opacity-40 justify-between">
            <div class = "flex flex-row items-center">
                <img class = "ml-1" src = {"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}></img>
                <div class = "ml-2">
                    <p class = " text-xs">{data.dt_txt.substring(5,10)}</p>
                    <p class = " text-xs">{data.weather[0].main}</p>
                </div>
            </div>
            <p class = "mr-3">{data.main.temp + "" + measurementType}</p>
        </div>
    );
  }
  export default DailyWeatherCard;