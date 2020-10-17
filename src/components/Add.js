import React, { useState } from 'react'
import Form from './Form'
import axios from 'axios'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

const Add = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createPerson = async (event) => {
    event.preventDefault()
    if(firstName.trim() && lastName.trim()){
      await axios.post('http://localhost:4000/person/', {firstName: firstName, lastName: lastName})
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
      props.closeAdd()
      props.getPerson()
      
    }
    else {
      console.log('error');
      store.addNotification({
        title:'Ошибка!',
        message:'Заполните пустые поля!',
        type: 'warning',
        container: 'top-center',
        insert: 'bottom',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          showIcon: true
        }
      })
    }
    
  }

  const onChangeFirstName = (value) => {
    console.log(value);
  }

  const onChangeLastName = (value) => {
    console.log(value);
  }

  return (
    <>
    <div className="popUp">
      <div className="background" onClick={() => props.closeAdd()}></div>
      <form className="popUp__all" onSubmit={(event) => createPerson(event)}>
        <div className="popUp-title">
          Добавить сотрудника
        </div>
        <div className="popUp-body">
          <span onClick={() => props.closeAdd()}>Назад к списку</span>
        <input value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="Введите имя сотрудника"/>
      <input value={lastName} onChange={event => setLastName(event.target.value)} placeholder="Введите фамилию сотрудника"/>
      <button>Сохранить</button>
        </div>
      </form>
    </div>
    <ReactNotification/>
    </>
    
    // <Form 
    // title='Добавить сотрудника'
    // closeForm={props.closeAdd()}
    // executeSubmit={createPerson}
    // onChangeFirstName={onChangeFirstName}
    // onChangeLastName={onChangeLastName}
    // firstName={firstName}
    // lastName={lastName}
    // />
  )
}

export default Add