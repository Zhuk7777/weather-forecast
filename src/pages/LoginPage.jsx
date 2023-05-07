import React, { useState } from 'react'
import SignInForm from '../UI/SignInForm';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [error, setError] = useState('')

  const handleLogin = (email, password) => {
    const auth = getAuth();
    if(email === '')
      setError('Заполните поля')
    else
    {
      signInWithEmailAndPassword(auth, email, password)
        .then(() =>setError('')
        )
        .catch(() => setError('Почта или пароль введены неверно'))
    }
  }
  return (
    <div>
      <SignInForm handleClick={handleLogin} error={error}/>
    </div>
  )
}

export default LoginPage;