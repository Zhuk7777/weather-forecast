import React, { useState } from "react";
import Header from "./components/header/Header";
import './styles/App.css';
import Card from "./components/card/Card";
import conditions from "./dictionary";

const apiKey='6c2cf4ff55624dee90594748232304'

function App() {
  const [weatherInfo, setWeatherInfo] = useState({city: '', country: '', temp: '', description: '', date: '', img: ''})
  const [visibleCard, setVisibleCard] = useState(false)
  const [error, setError] = useState(false)

  const getCity = (city) => {

    let urlToday =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    let urlWeek =`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`

    fetch(urlToday).then((response) => {
      return response.json()
    }).then((data) => {

      if(data.error)
      {
        setError(true)
        setVisibleCard(false)
      }

      else
      {
        let isDay = data.current.is_day
        let description = conditions.find((obj) => obj.code === data.current.condition.code)

        if(isDay === 1)
          isDay = 'day_text'
        else
          isDay = 'night_text'
        
        setWeatherInfo({city: `${data.location.name}`, country: `${data.location.country}`, temp: data.current.temp_c, description: `${description.languages[23][isDay]}`, date: data.location.localtime, img: `${data.current.condition.icon}`})

        setError(false)
        setVisibleCard(true)
      }

    })


    fetch(urlWeek).then((response) => {
      return response.json()
    }).then((data) => {
      //console.log(data)
    })

  }

  return (
    <div className="App">
      <Header getCity={getCity} error={error}/>

      <Card city={weatherInfo.city} country={weatherInfo.country} 
        degrees={weatherInfo.temp} weather={weatherInfo.description} date={weatherInfo.date}
        img={weatherInfo.img} visible={visibleCard}/>

    </div>
  );
}

export default App;
