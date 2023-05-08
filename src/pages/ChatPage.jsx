import React, { useState } from 'react'
import Header from '../components/header/Header';

const apiKey = process.env.REACT_APP_API_KEY

const ChatPage = () => {
    const [city, setCity] = useState('')  

    const getCity = (city) => {
        setCity(city)
    }

  return (
    <div>
        <Header getCity={getCity} apiKey={apiKey}/>
        <h1>{city}</h1>
    </div>
  )
}

export default ChatPage;