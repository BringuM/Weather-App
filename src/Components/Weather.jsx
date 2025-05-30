import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const  allIcons = {
    "01d": clear_icon,
    "o1n": clear_icon,
    "o2d": cloud_icon,
    "o2n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "o4d": drizzle_icon,
    "o4n": drizzle_icon,
    "o9d": rain_icon,
    "o9n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }
  const search = async(city) => {
    if(city === "") {
      alert("Enter City Name")
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidty: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  }

  useEffect(()=> {
    search("Nairobi");
  }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
        <input ref={inputRef} type='text' placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidty}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed}</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather
