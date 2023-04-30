import React from "react";
import classes from './Card.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";

const Card = ({city, country, degrees, feelTemp, weather, date, img}) => {
    
    let options = { weekday: 'long', month: 'long', day: 'numeric'};
    let today  = new Date(date);

    return(
        <div className={classes.card}>
            <h2 className={classes.cardDate}>{today.toLocaleDateString("rus", options)}</h2>
            <h2 className={classes.cardCity}>{city} <span className={classes.cardCountry}>{country}</span></h2>

            <div className={classes.cardWeather}>
                <div className={classes.cardValue}><FontAwesomeIcon icon={faTemperatureHalf} /> {degrees}<sup>°</sup></div>
                <img className={classes.cardImg} src={img} alt="Картинка"></img>
            </div>

            <div className={classes.cardFeelTemp}>Ощущается как {feelTemp}<sup>°</sup></div>

            <div className={classes.cardDescription}>
                {weather}
            </div>
        </div>
    )
}

export default Card;