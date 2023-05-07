import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import classes from './RegisterPage.module.css';
import SignUpForm from '../../UI/SignUpForm';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const RegisterPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [verification, setVerification] = useState(false)
  const auth = getAuth();

  const handleRegister = (email, password, name) => {
    if(password.length < 6)
      setError('Пароль должен сожержать не менее 6 символов')
    else if(email === '' || name === '')
      setError('Заполните все поля')
    else{ 
      setError('') 
      createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        sendEmailVerification(auth.currentUser)
        .then(()=> {
            if (auth.currentUser.emailVerified === false)
              setVerification(true)
            else
              navigate('/')
        })
      }
      )
      .catch(
        () => setError('Уже существует аккаунт с этой почтой')
      )
   }    
  }

  const continueClick = () => {
    console.log(auth.currentUser.emailVerified)
    if (auth.currentUser.emailVerified === true)
        navigate('/')
   }

  return (
      verification?
      <div className={classes.verificationCard}>
        <h3>Подтвердите адрес электронной почты</h3>
        <span>На вашу почту отправлено письмо для подтверждения. Пока почта не будет подтверждена регистрация не закончится</span>
        <button onClick={() => continueClick()}>Продолжить</button>
      </div>:
      <div>
        <SignUpForm handleClick={handleRegister} error={error}/>
        <Link className={classes.signIn} to='/login'><span>Уже есть аккаунт</span></Link>
      </div>
  )
}

export default RegisterPage;


/* createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        sendEmailVerification(auth.currentUser.emailVerified)
        .then(()=> {
            navigate('/')
        })
      .catch(console.error)
      }
      )*/