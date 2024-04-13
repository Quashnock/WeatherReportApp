import { useEffect, useState } from 'react'
import DigitalClock from './DigitalClock';
import HourlyWeatherCard from './HourlyWeatherCard';

function App() {
  
  const [userInput,setUserInput] = new useState("Seattle");
  const [currentWeather, setCurrentWeather] = new useState();
  const [hourlyWeather, setHourlyWeather] = new useState();


  async function handleDefault(){
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=4eac907fe887d92fab77396226c48e10&units=imperial")
    setCurrentWeather(await response.json());
    response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Seattle&appid=4eac907fe887d92fab77396226c48e10&units=imperial")
    setHourlyWeather(await response.json());
    console.log(hourlyWeather);
  }
  useEffect(()=> {
    handleDefault();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();

    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=4eac907fe887d92fab77396226c48e10&units=imperial")
    setCurrentWeather(await response.json());
    response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Seattle&appid=4eac907fe887d92fab77396226c48e10&units=imperial")
    setHourlyWeather(await response.json());
    console.log(hourlyWeather);
  }


  return (
    <>
      <div class = " w-[100vw] h-[100vh] bg-[url('assets/SunnyBackground.jpg')] bg-cover flex justify-center">
        <div class = "w-[90%] h-[90%] self-center border-white border-4 rounded-3xl flex flex-row">
          <div class = "w-[25%] h-full backdrop-blur-md flex flex-col items-center rounded-l-3xl border-r-[1px] border-opacity-25 border-white">
            <div class = "w-[60%] pt-[10%]">
              <form onSubmit={handleSubmit}>
                <input 
                value = {userInput}
                onChange = {e => (setUserInput(e.target.value))}
                class = " w-full bg-transparent border-white border-[1px] border-opacity-25 rounded-md pl-2" 
                placeholder = "Enter city here">
                </input>
              </form>
            </div>
            <img class = " w-1/2" src = {!currentWeather ? "☀" : "http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png"}/>
            <p class = "pb-7 text-white">21°C</p>
            <hr class = "w-[80%]"></hr>
          </div>
          <div class = "w-[75%] h-full flex flex-col justify-between">
            <div class = "w-full h-[10%]">
              <div class = "">
                <p class = " text-white p-7"><DigitalClock/></p>
              </div>
            </div>
            <div class = "w-full h-[45%]">
              <p class = " text-white text-6xl ml-7 mb-3">{!currentWeather ? "Sunny" : currentWeather.weather[0].main}</p>
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
