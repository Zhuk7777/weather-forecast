import React, { useEffect, useState } from "react";
import classes from './CertainDay.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTreeCity } from "@fortawesome/free-solid-svg-icons";

const Tomorrow = ({data}) => {


  const [time, setTime] = useState('')
  const [image, setImage] = useState('')
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [city,setCity] = useState('')
  const [date, setDate] = useState('')

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

      setCity(data.location.name)
      setDate(today.toLocaleDateString("rus", options))

      setTime(arrTime)
      setImage(arrImage)
      setTemp(arrTemp)
      setWind(arrWind)
      setHumidity(arrHumidity)

  }, [data])

    return (
      city === ''? <div></div>:
        <div className={classes.card}>

          <div className={classes.header}>
            <span className={classes.city}><FontAwesomeIcon icon={faTreeCity} />  {city} </span>
            <span className={classes.date}><FontAwesomeIcon icon={faCalendarDays} />  {date}</span>
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