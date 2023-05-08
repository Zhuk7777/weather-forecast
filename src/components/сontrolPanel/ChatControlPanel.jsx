import React from "react";
import classes from './ControlPanel.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";


const ChatControlPanel = ({city, date}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clickWeather = () => {
        navigate('/')
    }

    const changeUser = () => {
        dispatch(removeUser())
        navigate('/login')
    }
  return (
    <div className={classes.controlPanel}>
        <button className={classes.button} onClick={() => clickWeather()}>Погода</button>
        <button className={classes.button} onClick={() => changeUser()}>Сменить пользователя</button>
        <div className={classes.heading}>
            {city} {date}
        </div>
    </div>
  )
}

export default ChatControlPanel;