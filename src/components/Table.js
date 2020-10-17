import React, { useState } from 'react';
import axios from 'axios'
import Change from '../components/Change'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

const Table = (props) => {
  const [showChange, setShowChange] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [activeFirstName, setActiveFirstName] = useState('');
  const [activeLastName, setActiveLastName] = useState('');

  const deletePerson = async (id) => {
    await axios.delete(`http://localhost:4000/person/${id}`)
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
    props.getPerson()
  }

  const closeChange = () => {
    setShowChange(false)
  }

  const itemChange = (id, firstName, lastName) => {
    setShowChange(!showChange)
    setActiveId(id)
    setActiveFirstName(firstName)
    setActiveLastName(lastName)
  }

  return (
    <>
    <ReactNotification/>
      <table>
        <tr>
          <th></th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th></th>
        </tr>
        {props.person.map(item => {
          return (
            <tr>
              <td>
              <span class="material-icons">account_circle</span>
              </td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>
                <span onClick={() => itemChange(item.id, item.firstName, item.lastName)} className="material-icons">create</span>
                <span onClick={() => deletePerson(item.id)} className="material-icons">clear</span></td>
            </tr>
          )
        })}
      </table>
      {showChange ? <Change id={activeId} firstName={activeFirstName} lastName={activeLastName} getPerson={props.getPerson} closeChange={closeChange}/> : null}
    </>
  )
}

export default Table