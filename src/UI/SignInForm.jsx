import React from 'react'
import classes from './Form.module.css';

const SignInForm = () => {

  return (
    <div className={classes.form}> 
        <input className={classes.input} type='email' placeholder='Почта'/>
        <input className={classes.input} type='password' placeholder='Пароль'/>
        <button className={classes.btn}>Войти</button>
    </div>
  )
}

export default SignInForm;