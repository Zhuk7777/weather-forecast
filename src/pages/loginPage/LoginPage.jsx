import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import SignInForm from '../../UI/SignInForm';
import { Link, useNavigate } from 'react-router-dom';
import classes from './LoginPage.module.css';
import { setUser } from '../../store/slices/userSlice';
import { ref, get} from "firebase/database";
import database from '../../firebase';
import { useDispatch } from 'react-redux';

const LoginPage = () => {

  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth();

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
    setResetMessage(true)
  }

  const handleLogin = (email, password) => {

    if(email === '' || password === '')
      setError('Заполните поля')

    else
    {
      signInWithEmailAndPassword(auth, email, password)
        .then(({user}) =>{
          const dbRef = ref(database, 'users/' + user.uid);
          get(dbRef).then((data) => {
            if (data.exists()) {
              dispatch(setUser(data.val()))
            } 
          })
          auth.currentUser.reload()
          if(auth.currentUser.emailVerified === true)
          {
           setError('')
           navigate('/chat')
          }
          else
            setError('Аккаунт не подтвержден')
        }
        )
        .catch(() => setError('Почта или пароль введены неверно'))
    }
  }
  return (
    resetMessage?
    <div className={classes.resetMessage}>
        <h3>На вашу электронную почту отправлено письмо для сброса пароля</h3>
        <button className={classes.btn} onClick={() => setResetMessage(false)}>Ок</button>
    </div>:
    <div>
      <SignInForm handleClick={handleLogin} error={error} resetPass={resetPassword}/>
      <Link className={classes.signUp} to='/register'><span>Зарегистрироваться</span></Link>
    </div>
  )
}

export default LoginPage;