import React, { useState } from 'react';
import axios from 'axios'
import Change from '../components/Change'

const Table = (props) => {
  const [showChange, setShowChange] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [activeFirstName, setActiveFirstName] = useState('');
  const [activeLastName, setActiveLastName] = useState('');

  const deletePerson = async (id) => {
    await axios.delete(`http://localhost:4000/person/${id}`)
    props.getPerson()
  }

  const itemChange = (id, firstName, lastName) => {
    setShowChange(!showChange)
    setActiveId(id)
    setActiveFirstName(firstName)
    setActiveLastName(lastName)
  }

  return (
    <>
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
      {showChange ? <Change id={activeId} firstName={activeFirstName} lastName={activeLastName} getPerson={props.getPerson}/> : null}
    </>
  )
}

export default Table