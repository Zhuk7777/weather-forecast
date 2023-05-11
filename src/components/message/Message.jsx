import React from 'react'
import classes from './Message.module.css';

const Message = ({name, text}) => {
  return (
    <div className={classes.message}>
        <span className={classes.name}>{name}</span>
        <span>{text}</span>
    </div>
  )
}

export default Message;