import React, { useState, useEffect } from 'react';
import Table from './components/Table'
import Add from './components/Add'
import axios from "axios"
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [person, setPerson] = useState([]);

  const getPerson = async () => {
    await  axios.get("http://localhost:4000/person").then( response => setPerson(response.data))
    .catch( error => {
      if(error.response.status === 400){
        store.addNotification({
          title:'Ошибка!',
          message:'Неверный запрос',
          type: 'danger',
          container: 'bottom-center',
          insert: 'bottom',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true
          }
        })
      }
      else if(error.response.status === 404){
        store.addNotification({
          title:'Ошибка!',
          message:'Сотрудник не найден в системе',
          type: 'danger',
          container: 'bottom-center',
          insert: 'bottom',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true
          }
        })
      }
      else if(error.response.status === 500){
        store.addNotification({
          title:'Ошибка!',
          message:'Ошибка на стороне сервета. Повторите позднее.',
          type: 'danger',
          container: 'bottom-center',
          insert: 'bottom',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true
          }
        })
      }
      
    });
  }
  useEffect(() => {
    getPerson()
  }, []);
  const closeAdd = () => {
    setShowAdd(false)
  }

  return (
    <div className="container">
      <ReactNotification/>
      <Table 
        person={person}
        getPerson={getPerson}
      />
      <button 
      onClick={() => setShowAdd(true)}>
        Добавить сотрудника
        </button>
      {showAdd 
      ? <Add getPerson={getPerson} closeAdd={closeAdd} /> 
      : null}
      
    </div>
  );
}

export default App;
