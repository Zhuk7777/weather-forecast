import React from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LoginPage from "./pages/loginPage/LoginPage";

function App() {

  return (
    <Routes>
      <Route exact path="/" Component={HomePage}/>
      <Route exact path="/login" Component={LoginPage}/>
      <Route exact path="/register" Component={RegisterPage}/>
    </Routes>
  )
}

export default App;
