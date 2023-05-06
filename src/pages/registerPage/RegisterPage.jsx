import React from 'react'
import { Link } from 'react-router-dom';
import classes from './RegisterPage.module.css';
import SignUpForm from '../../UI/SignUpForm';

const RegisterPage = () => {
  return (
    <div>
       <SignUpForm/>
       <Link className={classes.signIn} to='/login'><span>Войти в аккаунт</span></Link>
    </div>
  )
}

export default RegisterPage;