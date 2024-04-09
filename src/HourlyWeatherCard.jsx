import React, {useState, useEffect} from "react";

function HourlyWeatherCard(props){


    return (
        <div class = "w-[12%] h-full backdrop-blur-md border-white border-opacity-25 border-[1px] rounded-xl flex flex-col items-center p-3 text-white">
            <p>12:00</p>
            <p class = " text-4xl mt-3">☀</p>
            <p class = " text-lg mt-5">21°C</p>
        </div>
    );
}

export default HourlyWeatherCard;