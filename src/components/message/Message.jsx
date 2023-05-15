import React, { useEffect, useState } from 'react'
import classes from './Message.module.css';

const Message = ({name, text, time}) => {

  return (
    <div className={classes.message}>
        <span className={classes.header}>
          <span className={classes.name}>{name}</span>
          <span className={classes.time}>{time}</span>
        </span>
        <span>{text}</span>
    </div>
  )
}

export default Message;