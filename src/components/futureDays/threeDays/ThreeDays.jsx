import React, { useEffect, useState } from "react";
import classes from './ThreeDays.module.css';
import conditions from "../../../dictionary";

const ThreeDays = ({data}) => {

    const [daysInfo, setdaysInfo] = useState([
        { date: '', img: '', temp_day: '', temp_night: '', description: '',},
        { date: '', img: '', temp_day: '', temp_night: '', description: '',},
        { date: '', img: '', temp_day: '', temp_night: '', description: '',},
    ])

    useEffect(() => {
        let daysInfo = []
        let options = { weekday: 'long', month: 'long', day: 'numeric'}
        let today  = new Date()

        for(let i=0; i<3; i++)
        {
            today  = new Date(data.forecast.forecastday[i].date)

            daysInfo[i] = {
                date: today.toLocaleDateString("rus", options),
                img: data.forecast.forecastday[i].day.condition.icon,
                temp_day: data.forecast.forecastday[i].hour[14].temp_c,
                temp_night: data.forecast.forecastday[i].hour[2].temp_c,
                description: conditions.find((obj) => obj.code === data.forecast.forecastday[i].day.condition.code).languages[23]['day_text'],
            }
        
        }

        setdaysInfo(daysInfo)
    }, [data])

    return (
        <div className={classes.cards}>
            {
                daysInfo.map( (day, index) =>
                    <div className={classes.card} key={index}>
                        <span className={classes.date}>{day.date}</span>
                        <img className={classes.image} src={day.img} alt="img"></img>
                        <span>Днем {day.temp_day}<sup>°</sup>С</span>
                        <span>Ночью {day.temp_night}<sup>°</sup>С</span>
                        <span>{day.description}</span>
                    </div>)
            }
        </div>
    )
}

export default ThreeDays;