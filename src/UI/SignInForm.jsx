import React, { useState } from 'react'
import classes from './Form.module.css';

const SignInForm = ({handleClick, visibleError}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={classes.form}> 
        <input
          className={classes.input} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email' 
          placeholder='Почта'
         />
        <input 
          className={classes.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password' 
          placeholder='Пароль'
        />
        <button className={classes.btn} onClick={() => handleClick(email, password) }>Войти</button>
        {
          visibleError?
          <div className={classes.error}>Почта или пароль введены неверно</div>
          :<span></span>
        } 
    </div>
  )
}

export default SignInForm;