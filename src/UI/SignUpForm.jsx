import React, { useState } from 'react'
import classes from './Form.module.css';

const SignUpForm = ({handleClick, error}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text' 
          placeholder='Имя'
        />
        <input 
          className={classes.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password' 
          placeholder='Пароль'
        />
        <button className={classes.btn} onClick={() => handleClick(email, password, name)}>Зарегистрироваться</button>
        {
          error?
          <div className={classes.error}>{error}</div>
          :<span></span>
        }
    </div>
  )
}

export default SignUpForm;