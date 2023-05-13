import React, { useEffect, useState } from 'react'
import classes from './Message.module.css';

const Message = ({name, text, isMyname}) => {

  const [styleName, setStyleName] = useState('')

  useEffect(() =>{
    if(isMyname)
      setStyleName(classes.myName)
    else
      setStyleName(classes.name)
  },[])

  return (
    <div className={classes.message}>
        <span className={styleName}>{name}</span>
        <span>{text}</span>
    </div>
  )
}

export default Message;