import React from 'react'
import classes from './Form.module.css';

const SignUpForm = () => {

  return (
    <div className={classes.form}> 
        <input className={classes.input} type='email' placeholder='Почта'/>
        <input className={classes.input} type='text' placeholder='Имя'/>
        <input className={classes.input} type='password' placeholder='Пароль'/>
        <button className={classes.btn}>Зарегистрироваться</button>
    </div>
  )
}

export default SignUpForm;