import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Change = (props) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

  
  const putPerson = async () => {
    await  axios.put(`http://localhost:4000/person/${props.id}`, {firstName: firstName, lastName: lastName})
    props.getPerson()
  }

  return (
    <div>
      <input value={firstName} onChange={event => setFirstName(event.target.value)}/>
      <input value={lastName} onChange={event => setLastName(event.target.value)}/>
      <button onClick={() => putPerson()}>Поменять</button>
    </div>
  )
}

export default Change
