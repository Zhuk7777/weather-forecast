import React from "react";
import classes from './ControlPanel.module.css';

const ChatControlPanel = ({city, date}) => {
    
  return (
    <div className={classes.controlPanel}>
        <button className={classes.button}>Погода</button>
        <button className={classes.button}>Сменить пользователя</button>
        <div className={classes.heading}>
            {city} {date}
        </div>
    </div>
  )
}

export default ChatControlPanel;