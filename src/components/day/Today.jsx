import React, { useEffect, useState }  from "react";
import conditions from "../../dictionary";
import AdditionalInfo from "./additionalInfo/AdditionalInfo";
import Card from "./card/Card";

const Today = ({data, addData}) =>{
    const [weatherInfo, setWeatherInfo] = useState({
        city: '', 
        country: '', 
        temp: '',
        feel_temp: '', 
        description: '', 
        date: '', 
        img: '',
        img_night: '',
        img_morning: '',
        img_day: '',
        img_evening: '',
        sunrise: '',
        sunset: '',
        temp_night: '',
        temp_morning: '',
        temp_day: '',
        temp_evening: '',
        description_nigth: '',
        description_morning: '',
        description_day: '',
        description_evening: '',
        pressure: '',
        humidity: '',
        wind: '',

  })

    useEffect( () => {
              let isDay = data.current.is_day
              if(isDay === 1)
                isDay = 'day_text'
              else
                isDay = 'night_text'
              
              setWeatherInfo({
                    city: `${data.location.name}`, 
                    country: `${data.location.country}`, 
                    temp: data.current.temp_c,
                    feel_temp: data.current.feelslike_c, 
                    description: `${conditions.find((obj) => obj.code === data.current.condition.code).languages[23][isDay]}`, 
                    date: data.location.localtime, 
                    img: `${data.current.condition.icon}`,
                    img_night: `${addData.forecast.forecastday[0].hour[1].condition.icon}`,
                    img_morning: `${addData.forecast.forecastday[0].hour[6].condition.icon}`,
                    img_day: `${addData.forecast.forecastday[0].hour[14].condition.icon}`,
                    img_evening: `${addData.forecast.forecastday[0].hour[19].condition.icon}`,
                    sunrise: addData.forecast.forecastday[0].astro.sunrise,
                    sunset: addData.forecast.forecastday[0].astro.sunset,
                    temp_night: addData.forecast.forecastday[0].hour[1].temp_c,
                    temp_morning: addData.forecast.forecastday[0].hour[6].temp_c,
                    temp_day: addData.forecast.forecastday[0].hour[14].temp_c,
                    temp_evening: addData.forecast.forecastday[0].hour[19].temp_c,
                    description_nigth: `${conditions.find((obj) => obj.code === addData.forecast.forecastday[0].hour[1].condition.code).languages[23]['night_text']}`,
                    description_morning: `${conditions.find((obj) => obj.code === addData.forecast.forecastday[0].hour[6].condition.code).languages[23]['day_text']}`,
                    description_day: `${conditions.find((obj) => obj.code === addData.forecast.forecastday[0].hour[14].condition.code).languages[23]['day_text']}`,
                    description_evening: `${conditions.find((obj) => obj.code === addData.forecast.forecastday[0].hour[19].condition.code).languages[23]['day_text']}`,
                    pressure: (data.current.pressure_mb*0.75).toFixed(2),
                    humidity: data.current.humidity,
                    wind: (data.current.wind_kph*0.27).toFixed(2),

              })

            }, [data, addData])


    return(
        <div>
                <Card city={weatherInfo.city} country={weatherInfo.country} 
                    degrees={weatherInfo.temp} feelTemp={weatherInfo.feel_temp}
                    weather={weatherInfo.description} date={weatherInfo.date}
                    img={weatherInfo.img}
                />

                <AdditionalInfo sunrise={weatherInfo.sunrise} sunset={weatherInfo.sunset}
                    tempNight={weatherInfo.temp_night} tempMorning={weatherInfo.temp_morning}
                    tempDay={weatherInfo.temp_day} tempEvening={weatherInfo.temp_evening}
                    pressure={weatherInfo.pressure} humidity={weatherInfo.humidity} 
                    wind={weatherInfo.wind} descriptionNigth={weatherInfo.description_nigth} 
                    descriptionMorning={weatherInfo.description_morning} 
                    descriptionDay={weatherInfo.description_day} 
                    descriptionEvening={weatherInfo.description_evening} 
                    imgNight={weatherInfo.img_night} imgMorning={weatherInfo.img_morning} 
                    imgDay={weatherInfo.img_day} imgEvening={weatherInfo.img_evening} 
                />


        </div>
    )
}

export default Today;