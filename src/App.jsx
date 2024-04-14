import { useEffect, useState } from 'react'
import DigitalClock from './DigitalClock';
import HourlyWeatherCard from './HourlyWeatherCard';
import DailyWeatherCard from './DailyWeatherCard';

function App() {
  
  const [userInput,setUserInput] = new useState("Seattle");
  const [currentWeather, setCurrentWeather] = new useState();
  const [hourlyWeather, setHourlyWeather] = new useState();
  const [measurementType, setMeasurementType] = new useState("F");


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

  const controller = new AbortController();
  const remote = controller.signal;
  function handleSubmit(e){
    e.preventDefault()
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=4eac907fe887d92fab77396226c48e10&units="  + (measurementType == "C" ? "imperial" : "metric"))
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data1 => {
    // Process data from the first API
    console.log('Data from API 1:', data1);
    setCurrentWeather(data1)

    // Fetch data from the second API endpoint
    return fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=4eac907fe887d92fab77396226c48e10&units=" + (measurementType == "C" ? "imperial" : "metric"));
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("'Network response was not ok'");
    }
    return response.json();
  })
  .then(data2 => {
    // Process data from the second API
    console.log('Data from API 2:', data2);
    setHourlyWeather(data2)
  })
  .catch(error => {
    alert("Invalid City Name")
  });
  }
  

  let nextHours = []
  for (let i = 0; i < 7 && hourlyWeather; i++){
    nextHours.push(<HourlyWeatherCard data = {hourlyWeather.list[i]} measurementType = {measurementType} setMeasurementType={setMeasurementType} handleSubmit = {handleSubmit}/>)
  }
  let nextDays = []
  for (let i = 8; i < 40 && hourlyWeather; i+=8){
    nextDays.push(<DailyWeatherCard data = {hourlyWeather.list[i]} measurementType = {measurementType} setMeasurementType={setMeasurementType} handleSubmit = {handleSubmit}/>)
  }


  return (
    <>
        <div id = "upperDiv" class = " w-[100vw] h-[100vh] bg-cover flex justify-center absolute z-10 bg-[url('assets/ClearBackground.jpg')] ">
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
              <button 
                class = "mb-7 text-white"
                onClick={(e)=> {
                  setMeasurementType(measurementType == "F" ? "C" : "F");
                  handleSubmit(e);
                }}
              >{!currentWeather ? "21°C" : currentWeather.main.temp + "°" + measurementType}</button>
              <hr class = "w-[80%]"></hr>
              {nextDays}
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
                <div class = "w-[full] h-[60%] flex flex-row justify-center self-center">
                  {nextHours}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default App
