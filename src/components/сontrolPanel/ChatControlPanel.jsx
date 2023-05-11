import React from "react";
import classes from './ControlPanel.module.css';
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";


const ChatControlPanel = () => {

    const navigate = useNavigate()

    const clickWeather = () => {
        navigate('/')
    }

    const changeUser = () => {
        navigate('/login')
    }

    const exit = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        navigate('/')
      })
    }
  return (
    <div className={classes.controlPanel}>
        <button className={classes.button} onClick={() => clickWeather()}>Погода</button>
        <button className={classes.button} onClick={() => changeUser()}>Сменить пользователя</button>
        <button className={classes.button} onClick={() => exit()}>Выйти</button>
    </div>
  )
}

export default ChatControlPanel;