import React, { useEffect, useMemo, useState } from "react";
import classes from './Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { assignCity } from "../../store/slices/citySlice";

const Header = ({getCity, error, apiKey}) => {
    
    const [city, setCity] = useState('')
    const [visible, setVisible] = useState(false)
    const [cities, setCities] = useState([])

    const dispatch = useDispatch()

    const sendCity = (event) => {
        event.preventDefault()
        dispatch(assignCity({
            city: city.trim(),
        }))
        setVisible(false)        
        getCity(city.trim())
        setCity('')
    }

    const storeCity = useSelector(state => state.city.city)

    useEffect(() => {
        console.log('header')
        if(storeCity !== null)
            getCity(storeCity)
    },[])

    const myPlaceholder = useMemo(() => {
        if(error)
            return `Город не найден`
        else
            return "Введите город"
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
            let url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`
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
                <input className={classes.input} type="search" 
                placeholder={myPlaceholder}
                value={city} onChange={c => changeInput(c.target.value)}/>
                <button className={classes.btn} onClick={sendCity}>Показать</button>
            </form>
            <div className={myclass} onClick={e => e.stopPropagation()}>
            { cities.map( hint =>
                <button className={classes.hintItem} key={hint.id} onClick={() => clickCity(hint.name)}>
                    {hint.name}
                </button>)
            }
            </div>
        </div>
    )
}

export default Header;