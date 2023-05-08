import React, { useState } from 'react'
import Header from '../../components/header/Header';
import ChatControlPanel from '../../components/сontrolPanel/ChatControlPanel';
import classes from './ChatPage.module.css';

const apiKey = process.env.REACT_APP_API_KEY

const ChatPage = () => {

    const [city, setCity] = useState('') 
    const [error, setError] = useState(false) 
    const [date, setDate] = useState('')


    const getCity = (city) => {

      let url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  
      fetch(url).then((response) => {
        return response.json()
      }).then((data) => {
  
        if(data.error)
        {
          setError(true)
          setCity('')
          setDate('')
        }
  
        else
        {
          setError(false)

          city = city.toLowerCase()
          city = city[0].toUpperCase() + city.slice(1)
          setCity(city)

          let options = {month: 'long', day: 'numeric'}
          let today  = new Date(data.location.localtime)
          setDate(today.toLocaleDateString("rus", options))
        }
  
      })
    }

  return (
    <div>
        <Header getCity={getCity} error={error} apiKey={apiKey}/>
        <ChatControlPanel city={city} date={date}/>
        <div className={classes.posts}>
        </div>
    </div>
  )
}

export default ChatPage;