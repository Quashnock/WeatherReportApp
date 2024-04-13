import { useState } from 'react'
import DigitalClock from './DigitalClock';
import HourlyWeatherCard from './HourlyWeatherCard';

function App() {
  
  const [city,setCity] = new useState();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  console.log(currentWeather);
  console.log(forecast);


  return (
    <>
      <div class = " w-[100vw] h-[100vh] bg-[url('assets/SunnyBackground.jpg')] bg-cover flex justify-center">
        <div class = "w-[90%] h-[90%] self-center border-white border-4 rounded-3xl flex flex-row">
          <div class = "w-[25%] h-full backdrop-blur-md flex flex-col items-center rounded-l-3xl border-r-[1px] border-opacity-25 border-white">
            <div class = "w-[60%] pt-[10%]">
              <input 
              value = {city}
              onChange = {e => (setCity(e.target.value))}
              class = " w-full bg-transparent border-white border-[1px] border-opacity-25 rounded-md pl-2" 
              placeholder = "Enter city here">

              </input>
            </div>
            <p class = " text-7xl pt-7 pb-5 pl-3 text-white">☀</p>
            <p class = "pb-7 text-white">21°C</p>
            <hr class = "w-[80%]"></hr>
          </div>
          <div class = "w-[75%] h-full flex flex-col justify-between">
            <div class = "w-full h-[10%]">
              <div class = "">
                <p class = " text-white p-7"><DigitalClock/> {city}</p>
              </div>
            </div>
            <div class = "w-full h-[45%]">
              <p class = " text-white text-6xl ml-7 mb-3">Sunny</p>
              <div class = "w-full h-[10%] flex flex-row justify-center">
                <hr class = "w-[93%]"></hr>
              </div>
              <div class = "w-[90%] h-[60%] flex flex-row justify-center">
                  <HourlyWeatherCard test = {"test"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
