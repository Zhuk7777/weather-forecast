import React from "react";
import classes from './AdditionalInfo.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faGaugeHigh, faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import convertTime12to24 from "../../../generalfunctions/convertTime12to24";


const AdditionalInfo = ({sunrise, sunset, tempNight, tempMorning, tempDay, tempEvening, pressure,
    humidity, wind, descriptionDay, descriptionNigth, descriptionMorning, descriptionEvening, 
    imgNight, imgMorning, imgDay, imgEvening}) => {

    return(
        <div className={classes.addInfo}>
                <div className={classes.header}>
                    <div className={classes.sunrise}>
                        Рассвет {convertTime12to24(sunrise)}  <FontAwesomeIcon icon={faSun} />
                    </div>

                    <div className={classes.sunset}>
                        Закат {convertTime12to24(sunset)}  <FontAwesomeIcon icon={faMoon} />
                    </div> 

                    <span className={classes.pressure}><FontAwesomeIcon icon={faGaugeHigh} /> {pressure} мм рт. ст.</span>

                    <span className={classes.humidity}><FontAwesomeIcon icon={faDroplet} /> {humidity}%</span>
                    <span className={classes.wind}><FontAwesomeIcon icon={faWind} /> {wind} м/c</span>
                </div>

                <div className={classes.nigth}>
                    <span className={classes.time}>Ночью:</span>
                    <span className={classes.temp}>{tempNight}<sup>°</sup></span>
                    <span className={classes.description}>{descriptionNigth}</span>  
                    <img className={classes.img} src={imgNight} alt="img" />
                </div>

                <div className={classes.morning}>
                    <span className={classes.time}>Утром:</span>
                    <span className={classes.temp}>{tempMorning}<sup>°</sup></span>
                    <span className={classes.description}>{descriptionMorning}</span>   
                    <img className={classes.img} src={imgMorning} alt="img" />
                </div>

                <div className={classes.day}>
                    <span className={classes.time}>Днем:</span>
                    <span className={classes.temp}>{tempDay}<sup>°</sup></span>
                    <span className={classes.description}>{descriptionDay}</span> 
                    <img className={classes.img} src={imgDay} alt="img" />
                </div>

                <div className={classes.evening}>
                    <span className={classes.time}>Вечером:</span>
                    <span className={classes.temp}>{tempEvening}<sup>°</sup></span>
                    <span className={classes.description}>{descriptionEvening}</span>  
                    <img className={classes.img} src={imgEvening} alt="img" /> 
                </div>



        </div>
    )
}

export default AdditionalInfo;