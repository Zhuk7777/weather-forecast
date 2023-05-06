import React from 'react'
import classes from './Form.module.css';

const Form = ({textButton}) => {

  return (
    <div className={classes.form}> 
        <input className={classes.input} type='email' placeholder='Почта'/>
        <input className={classes.input} type='password' placeholder='Пароль'/>
        <button className={classes.btn}>{textButton}</button>
    </div>
  )
}

export default Form;