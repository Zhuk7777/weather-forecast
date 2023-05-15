import React, { useState } from "react";
import classes from './ControlPanel.module.css';
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";


const ChatControlPanel = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
      name: '',
      email: '',
    })

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

    const showUserInfo = () => {
      const auth = getAuth()
      if(auth.currentUser)
      {
        setUser({
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
        })
      }
    }

    const hideUserInfo = () => {
      setUser({
        name: '',
        email: '',
      })
    }

  return (
    <div className={classes.controlPanel}>
        <button className={classes.button} onClick={() => clickWeather()}>Погода</button>
        <button className={classes.button} onClick={() => changeUser()} onMouseOver={() => showUserInfo()} onMouseLeave={() => hideUserInfo()}>Сменить пользователя</button>
        <button className={classes.button} onClick={() => exit()}>Выйти</button>
        {
          user.name?
          <div className={classes.userInfo}>
            <span>Текущий пользователь</span>
            <span style={{color: '#9198e5'}}>{user.name}</span>
            <span style={{color: '#9198e5'}}>{user.email}</span>
          </div>:
          <div></div>
        }
    </div>
  )
}

export default ChatControlPanel;