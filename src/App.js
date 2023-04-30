import React, { useState } from "react";
import Header from "./components/header/Header";
import './styles/App.css';
import ControlPanel from "./components/сontrolPanel/ControlPanel";
import InfoField from "./components/infoField/InfoField";

const apiKey='6c2cf4ff55624dee90594748232304'

function App() {

  const [selection, setSelection] = useState('today')
  const [error,setError] = useState(false)
  const [data, setData] = useState('')
  const [addData, setAddData] = useState('')

  const getSelection = (selection) => {
    setSelection(selection)
  }


  const getCity = (city) => {

    let url1 =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    let url2 =`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`

    fetch(url1).then((response) => {
      return response.json()
    }).then((data) => {

      if(data.error)
      {
        setError(true)
        setData('')
        setAddData('')
      }

      else
      {

        fetch(url2).then((res) => {
          return res.json()
        }).then((addData) => {

          setData(data)
          setAddData(addData)
        })

        setError(false)
      }

    })
  }


  return (
    <div className="App">
      <Header getCity={getCity} error={error}/>
      <ControlPanel getSelection={getSelection}/>
      <InfoField data={data} addData={addData} selection={selection}/>
    </div>
  );
}

export default App;
