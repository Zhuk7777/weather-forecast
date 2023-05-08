import React from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ChatPage from "./pages/chatPage/ChatPage";

function App() {

  return (
    <Routes>
      <Route exact path="/" Component={HomePage}/>
      <Route exact path="/login" Component={LoginPage}/>
      <Route exact path="/register" Component={RegisterPage}/>
      <Route exact path="/chat" Component={ChatPage}/>
    </Routes>
  )
}

export default App;
