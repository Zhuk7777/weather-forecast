import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import ChatControlPanel from '../../components/сontrolPanel/ChatControlPanel';
import classes from './ChatPage.module.css';
import Message from '../../components/message/Message';
import { getAuth } from "firebase/auth"
import database from '../../firebase';
import { ref, set, onValue } from "firebase/database";

const apiKey = process.env.REACT_APP_API_KEY

const ChatPage = () => {
    const [city, setCity] = useState('') 
    const [error, setError] = useState(false) 
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState('')
    let auth = null

    useEffect(() => {
        auth = getAuth()
        let url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  
        fetch(url).then((response) => {
          return response.json()
        }).then((data) => {
    
          if(!data.error)
          {
            let options = { year: 'numeric', month: 'long', day: 'numeric'}
            let today  = new Date(data.location.localtime)
            const dbRef = ref(database, `messages/${city}/${today.toLocaleDateString("rus", options).slice(0, -1)}`);
            onValue(dbRef, (snapshot) => {
              const data = snapshot.val();
              //console.log(Object.values(data))
              setMessages(Object.values(data))
              });
          }
    
        })
    },[city])

    const getCity = (city) => {
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
    }

    const sendMessage = (text) => {
      if(text !== '')
      {
        auth = getAuth()
        const newMessage = {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
          text: text,
        }

        let url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  
        fetch(url).then((response) => {
          return response.json()
        }).then((data) => {
    
          if(!data.error)
          {
            let options = { year: 'numeric', month: 'long', day: 'numeric'}
            let today  = new Date(data.location.localtime)
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

            <span className={classes.headerChat}>{city}</span>

            <div className={classes.messages}>
              <Message name={'Давид'} text={'Что лучше надеть сегодня?'} isMyname={true}/>
              <Message name={'Дмитрий'} text={'Не смотря на хорошую температуру, на улице прохладно, холодный сильный ветер. Поэтому лучше оденьтесь потеплее'}/>
              <Message name={'Светлана'} text={'Дмитрий, полностью согласна. Посмотрела утром прогноз погоды и казалось, что на улице тепло, оделась легко и уже промерзла'}/>
              <Message name={'Давид'} text={'Спасибо'}/>
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