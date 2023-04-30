import React, { useState } from "react";
import classes from './Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella} from "@fortawesome/free-solid-svg-icons";

const Header = ({getCity, error}) => {
    const [city, setCity] = useState('')

    const sendCity = (event) => {
        event.preventDefault()
        getCity(city.trim())
        setCity('')
    }

    let myPlaceholder

    if(error)
        myPlaceholder = "Город не найден"
    else
        myPlaceholder = "Введите название города"

    return (
        <div className={classes.header}>
            <h1 className={classes.title}>Wheather AMM  <FontAwesomeIcon icon={faUmbrella} beat /></h1>
            <form className={classes.form}>
                <input className={classes.input} type="text" 
                placeholder={myPlaceholder}
                value={city} onChange={c => setCity(c.target.value)}/>
                <button className={classes.btn} onClick={sendCity}>Показать</button>
            </form>

        </div>
    )
}

export default Header;