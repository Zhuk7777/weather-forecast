import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import SignInForm from '../../UI/SignInForm';
import { useNavigate } from 'react-router-dom';
import classes from './LoginPage.module.css';

const LoginPage = () => {
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth();

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
    setResetMessage(true)
  }

  const handleLogin = (email, password) => {
    auth.currentUser.reload()
    if(email === '' || password === '')
      setError('Заполните поля')
    else if(auth.currentUser.emailVerified === true)
    {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setError('')
          navigate('/')
        }
        )
        .catch(() => setError('Почта или пароль введены неверно'))
    }
    else
      setError('Аккаунт не подтвержден')
  }
  return (
    resetMessage?
    <div className={classes.resetMessage}>
        <h3>На вашу электронную почту отправлено письмо для сброса пароля</h3>
        <button className={classes.btn} onClick={() => setResetMessage(false)}>Ок</button>
    </div>:
    <div>
      <SignInForm handleClick={handleLogin} error={error} resetPass={resetPassword}/>
    </div>
  )
}

export default LoginPage;