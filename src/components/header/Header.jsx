import React, { useMemo, useState } from "react";
import classes from './Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella} from "@fortawesome/free-solid-svg-icons";

const Header = ({getCity, error}) => {
    
    const [city, setCity] = useState('')
    const [visible, setVisible] = useState(false)
    const [cities, setCities] = useState('')

    const sendCity = (event) => {
        event.preventDefault()
        setVisible(false)
        getCity(city.trim())
        setCity('')
    }

    const myPlaceholder = useMemo(() => {
        if(error)
            return "Город не найден"
        else
            return "Введите название города"
    }, [error])

    const myclass = useMemo (() => {
        if(visible)
            return classes.popupHint
        else
            return classes.popupHintNoActive

    }, [visible])


    const changeInput = (city) => {
        setVisible(true)
        setCity(city)

        if(city.trim() !== '')
        {
            let url = `http://api.weatherapi.com/v1/search.json?key=6c2cf4ff55624dee90594748232304&q=${city}`
            fetch(url).then((response) => {
                return response.json()
              }).then((data) => { 

                let cities = data.reduce((result, item) => {
                    return result.includes(item.name) ? result :[...result, item.name];
                }, []);


                cities = cities.map((item, index) => {
                    return {id: index, name: item}
                })

                setCities(cities)
              })
        }

        else
            setVisible(false)

    }

    const clickCity = (city) => {
        setCity(city)
    }

    const clickOutside = () => {
        setVisible(false)
    }

    return (
        <div className={classes.header} onClick={clickOutside}>
            <h1 className={classes.title}>Weather AMM<FontAwesomeIcon icon={faUmbrella}/></h1>
            <form className={classes.form}>
                <input className={classes.input} type="text" 
                placeholder={myPlaceholder}
                value={city} onChange={c => changeInput(c.target.value)}/>
                <button className={classes.btn} onClick={sendCity}>Показать</button>
            </form>
            <div className={myclass} onClick={e => e.stopPropagation()}>
            {cities? cities.map( hint =>
                <button className={classes.hintItem} key={hint.id} onClick={() => clickCity(hint.name)}>
                    {hint.name}
                </button>)
            :<span></span>}
            </div>
        </div>
    )
}

export default Header;