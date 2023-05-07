import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import classes from './RegisterPage.module.css';
import SignUpForm from '../../UI/SignUpForm';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const RegisterPage = () => {
  const navigate = useNavigate()

  const handleRegister = (email, password, name) => {
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(() =>{
      sendEmailVerification(auth.currentUser)
      .then(()=> {
          console.log(auth.currentUser.emailVerified)
          //navigate('/')
      })
    .catch(console.error)
    }
    )
      
  }
  return (
    <div>
       <SignUpForm handleClick={handleRegister}/>
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