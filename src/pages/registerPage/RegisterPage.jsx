import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import classes from './RegisterPage.module.css';
import SignUpForm from '../../UI/SignUpForm';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const RegisterPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleRegister = (email, password, name) => {
    const auth = getAuth();
    if(password.length < 6)
      setError('Пароль должен сожержать не менее 6 символов')
    else{ 
      setError('') 
      createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        sendEmailVerification(auth.currentUser)
        .then(()=> {
            console.log(auth.currentUser.emailVerified)
            //navigate('/')
        })
      }
      )
      .catch(
        () => setError('Уже существует аккаунт с этой почтой')
      )
   }
      
  }
  return (
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