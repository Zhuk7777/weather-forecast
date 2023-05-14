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
        auth.currentUser.displayName = name
        sendEmailVerification(auth.currentUser)
        .then(()=> {
          setVerification(true)
        })
      }
      )
      .catch(
        () => setError('Уже существует аккаунт с этой почтой')
      )
   }    
  }

  const continueClick = () => {
    auth.currentUser.reload()
    if (auth.currentUser.emailVerified === true)
        navigate('/chat')
   }

  return (
      verification?
      <div className={classes.verificationCard}>
        <h3>Подтвердите адрес электронной почты</h3>
        <span>На вашу почту отправлено письмо для подтверждения.Регистрация не будет завершена без подтверждения</span>
        <button className={classes.btn} onClick={() => continueClick()}>Продолжить</button>
      </div>:
      <div>
        <SignUpForm handleClick={handleRegister} error={error}/>
        <Link className={classes.signIn} to='/login'><span>Уже есть аккаунт</span></Link>
      </div>
  )
}

export default RegisterPage;