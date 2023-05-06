import React from 'react'
import Form from '../../UI/Form';
import { Link } from 'react-router-dom';
import classes from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div>
       <Form textButton={'Зарегистрироваться'}/>
       <Link className={classes.signIn} to='/login'><span>Войти в аккаунт</span></Link>
    </div>
  )
}

export default RegisterPage;