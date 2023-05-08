import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import SignInForm from '../../UI/SignInForm';
import { useNavigate } from 'react-router-dom';
import classes from './LoginPage.module.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { ref, get} from "firebase/database";
import database from '../../firebase';

const LoginPage = () => {

  const dispatch = useDispatch
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
          let getUser = {}
          const dbRef = ref(database, 'users/' + user.uid);
          get(dbRef).then((data) => {
            if (data.exists()) {
              getUser = data
            } 
          })
          console.log(getUser)
          dispatch(setUser(getUser))
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
    </div>
  )
}

export default LoginPage;