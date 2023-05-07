import React from 'react'
import { Link } from 'react-router-dom';
import classes from './RegisterPage.module.css';
import SignUpForm from '../../UI/SignUpForm';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage = () => {
  const handleRegister = (email, password, name) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(console.log)
      .catch(console.error)
  }
  return (
    <div>
       <SignUpForm handleClick={handleRegister}/>
       <Link className={classes.signIn} to='/login'><span>Уже есть аккаунт</span></Link>
    </div>
  )
}

export default RegisterPage;