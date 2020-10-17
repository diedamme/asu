import React, { useState } from 'react'
import axios from 'axios'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

const Change = (props) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

  
  const putPerson = async () => {
    await  axios.put(`http://localhost:4000/person/${props.id}`, {firstName: firstName, lastName: lastName})
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

    props.closeChange()
    props.getPerson()
  }

  return (
    <>
    
<div className="popUp">
<div className="background" onClick={() => props.closeChange()}></div>
<div className="popUp__all">
  <div className="popUp-title">
    Редактирование сотрудника
  </div>
  <div className="popUp-body">
    <span onClick={() => props.closeChange()}>Назад к списку</span>
      <input value={firstName} onChange={event => setFirstName(event.target.value)}/>
      <input value={lastName} onChange={event => setLastName(event.target.value)}/>
    <button onClick={() => putPerson()}>Сохранить</button>
  </div>
</div>
</div>
<ReactNotification/>
</>
  )
}

export default Change
