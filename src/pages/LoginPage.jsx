import React, { useState } from 'react'
import SignInForm from '../UI/SignInForm';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [visibleError, setVisibleError] = useState(false)

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() =>setVisibleError(false)
      )
      .catch(() => setVisibleError(true))
  }
  return (
    <div>
      <SignInForm handleClick={handleLogin} visibleError={visibleError}/>
    </div>
  )
}

export default LoginPage;