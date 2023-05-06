import React from 'react'
import classes from './Form.module.css';

const Form = ({textButton}) => {

  return (
    <div className={classes.form}> 
        <input className={classes.fields} type='email' placeholder='Почта'/>
        <input className={classes.fields} type='password' placeholder='Пароль'/>
        <button className={classes.fields}>{textButton}</button>
    </div>
  )
}

export default Form;