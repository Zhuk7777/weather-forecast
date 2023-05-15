import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import ChatControlPanel from '../../components/сontrolPanel/ChatControlPanel';
import classes from './ChatPage.module.css';
import Message from '../../components/message/Message';
import { getAuth } from "firebase/auth"
import database from '../../firebase';
import { ref, set, onValue } from "firebase/database";
import Loading from '../../components/loading/Loading';

const apiKey = process.env.REACT_APP_API_KEY

const ChatPage = () => {
    const [city, setCity] = useState('') 
    const [error, setError] = useState(false) 
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState('')
    const [auth, setAuth] = useState(getAuth())
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  
        fetch(url).then((response) => {
          return response.json()
        }).then((data) => {
    
          if(!data.error)
          {
            let options = { year: 'numeric', month: 'long', day: 'numeric'}
            let optionsHeader = { month: 'long', day: 'numeric'}
            let today  = new Date(data.location.localtime)

            setDate(today.toLocaleDateString("rus", optionsHeader))
            
            const dbRef = ref(database, `messages/${city}/${today.toLocaleDateString("rus", options).slice(0, -1)}`);
            onValue(dbRef, (snapshot) => {
              const data = snapshot.val();
              if(data)
                setMessages(Object.values(data))
              else 
                setMessages('')
              });
          }
    
        })
    },[city])

    const getCity = (city) => {
      setLoading(true);
      let url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  
      fetch(url).then((response) => {
        return response.json()
      }).then((data) => {
  
        if(data.error)
        {
          setError(true)
          setCity('')
        }
  
        else
        {
          setError(false)

          city = city.toLowerCase()
          city = city[0].toUpperCase() + city.slice(1)
          setCity(city)
        }
  
      })
      setTimeout(() => setLoading(false), 2000);
    }

    const timeOfDay = (time) => {
      if(time >= 0 && time < 5)
        return 'ночь'
      if(time >= 5 && time< 12)
        return 'утро'
      if(time >=12 && time < 17)
        return 'день'
      if(time >=17 && time < 22)
        return 'вечер'
      if(time >=22)
        return 'ночь'
    }

    const sendMessage = (text) => {
      if(text !== '')
      {
        let url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  
        fetch(url).then((response) => {
          return response.json()
        }).then((data) => {
    
          if(!data.error)
          {
            let options = { year: 'numeric', month: 'long', day: 'numeric'}
            let today  = new Date(data.location.localtime)

            const newMessage = {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
              text: text,
              time: timeOfDay(today.getHours()),
            }

            const dbRef = ref(database, `messages/${city}/${today.toLocaleDateString("rus", options).slice(0, -1)}/` + Date.now() + auth.currentUser.uid);
            set(dbRef, newMessage);
            setMessageText('')
          }
    
        })
      }
    }

  return (
    <div>
        <Header getCity={getCity} error={error} apiKey={apiKey}/>
        <ChatControlPanel/>
        {
          city?
          <div className={classes.form}>

            <span className={classes.headerChat}>{city} {date}</span>

            <div className={classes.messages}>
                { 
                !loading?
                  messages?
                  messages.map((item, index) => 
                    <Message name={item.name} text={item.text} key={index} time={item.time}/>
                    ) 
                  :<span></span>
                :<Loading/>
                }
            </div>

            <div className={classes.messagePanel}>
              <textarea className={classes.textField} 
                cols='67'  rows='2' 
                autoCorrect='on' 
                placeholder='Напишите сообщение'
                value={messageText}
                onChange={e => setMessageText(e.target.value)}>
              </textarea>
              <button className={classes.btn} onClick={() => sendMessage(messageText)}>Отправить</button>
            </div>

          </div>
          :<span></span>
        }
    </div>
  )
}

export default ChatPage;