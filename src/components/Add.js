import React, { useState } from 'react'
import axios from 'axios'

const Add = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createPerson = async () => {
    await axios.post('http://localhost:4000/person/', {firstName: firstName, lastName: lastName})
    props.getPerson()
  }

  return (
    <div className="add">
      <div>
      <input value={firstName} onChange={event => setFirstName(event.target.value)}/>
      <input value={lastName} onChange={event => setLastName(event.target.value)}/>
      <button onClick={() => createPerson()}>Добавить</button>
      </div>
    </div>
  )
}

export default Add