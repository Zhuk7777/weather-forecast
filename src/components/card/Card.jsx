import React from "react";
import classes from './Card.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";

const Card = ({city, country, degrees, weather, date, img, visible}) => {


    let options = { weekday: 'long', month: 'long', day: 'numeric'};
    let today  = new Date(date);


    let display
    if(visible)
        display = classes.card
    else
        display = classes.cardNoActive

    return(
        <div className={display}>
            <h2 className={classes.cardDate}>{today.toLocaleDateString("rus", options)}</h2>
            <h2 className={classes.cardCity}>{city} <span className={classes.cardCountry}>{country}</span></h2>

            <div className={classes.cardWeather}>
                <div className={classes.cardValue}><FontAwesomeIcon icon={faTemperatureHalf} /> {degrees}<sup>°</sup></div>
                <img className={classes.cardImg} src={img} alt="Картинка"></img>
            </div>

            <div className={classes.cardDescription}>
                {weather}
            </div>
        </div>
    )
}

export default Card;