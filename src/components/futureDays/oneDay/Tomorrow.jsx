import React, { useEffect, useState } from "react";
import classes from './CertainDay.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faGaugeHigh, faMoon, faSun, faTreeCity } from "@fortawesome/free-solid-svg-icons";

const Tomorrow = ({data}) => {


  const [time, setTime] = useState('')
  const [image, setImage] = useState('')
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [headerInfo, setHeaderInfo] = useState({
            city: '',
            date: '',
            pressure: '',
            sunrise: '',
            sunset: '',
  })

  useEffect( () => {

      console.log(data)
      let arrTime = []
      let arrImage = []
      let arrTemp = []
      let arrWind = []
      let arrHumidity =[]
  
      for(let i=0, j=0; i<24; i+=3, j++)
      {
        if(j < 4)
          arrTime[j] = `0${i}:00`
        else
          arrTime[j] = `${i}:00`
  
        arrImage[j] = `${data.forecast.forecastday[1].hour[i].condition.icon}`
        arrTemp[j] = data.forecast.forecastday[1].hour[i].temp_c
        arrWind[j] = (data.forecast.forecastday[1].hour[i].wind_kph*0.27).toFixed(2)
        arrHumidity[j] = data.forecast.forecastday[1].hour[i].humidity
  
      }

      let options = { weekday: 'long', month: 'long', day: 'numeric'};
      let today  = new Date(data.forecast.forecastday[1].date);

      setHeaderInfo({
        city: data.location.name,
        date:today.toLocaleDateString("rus", options),
        pressure: (data.forecast.forecastday[1].hour[13].pressure_mb*0.75).toFixed(2),
        sunrise: data.forecast.forecastday[1].astro.sunrise,
        sunset:  data.forecast.forecastday[1].astro.sunset

      })

      setTime(arrTime)
      setImage(arrImage)
      setTemp(arrTemp)
      setWind(arrWind)
      setHumidity(arrHumidity)

  }, [data])

  const convertTime12to24 = time12h => {
    const [time, modifier] = time12h.split(" ")
  
    let [hours, minutes] = time.split(":")
  
    if (hours === "12") {
      hours = "00"
    }
  
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12
    }
  
    return `${hours}:${minutes}`
  } 

    return (
      headerInfo.city === ''? <div></div>:
        <div className={classes.card}>

          <div className={classes.header}>

            <div className={classes.location}>
                <span className={classes.city}><FontAwesomeIcon icon={faTreeCity} />  {headerInfo.city} </span>
                <span className={classes.date}><FontAwesomeIcon icon={faCalendarDays} />  {headerInfo.date}</span>
            </div>

            <div className={classes.sunrise}>Рассвет {convertTime12to24(headerInfo.sunrise)} <FontAwesomeIcon icon={faSun}/> </div>
            <div className={classes.sunset}>Закат {convertTime12to24(headerInfo.sunset)} <FontAwesomeIcon icon={faMoon}/> </div>
            <div className={classes.pressure}><FontAwesomeIcon icon={faGaugeHigh} /> {headerInfo.pressure} мм рт. ст.</div>
            
          </div>

          <div className={classes.time}>
              {time.map( (item, index) =>
                <div className={classes.item} key={index}>
                    {item}
                </div>)
              }
          </div>

          <div className={classes.image}>
              {image.map( (item, index) =>
                    <img className={classes.item} key={index} src={item} alt="img"/>
                  )
              }
          </div>

          <span className={classes.caption}>Температура воздуха,<sup>°</sup>С</span>

          <div className={classes.temp}>
              {temp.map( (item, index) =>
                    <div className={classes.item} key={index}>
                        {item}
                    </div>)
              }
          </div>

          <span className={classes.caption}>Порывы ветра, м/c</span>

          <div className={classes.wind}>
              {wind.map( (item, index) =>
                    <div className={classes.item} key={index}>
                        {item}
                    </div>)
              }
          </div>

          <span className={classes.caption}>Влажность, %</span>

          <div className={classes.humidity}>
              {humidity.map( (item, index) =>
                    <div className={classes.item} key={index}>
                        {item}
                    </div>)
              }
          </div>

        </div>
    )
}

export default Tomorrow;