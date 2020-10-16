import React, { useState, useEffect } from 'react';
import Table from './components/Table'
import Add from './components/Add'
import axios from "axios";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [person, setPerson] = useState([]);

  const getPerson = async () => {
    await  axios.get("http://localhost:4000/person").then( response => setPerson(response.data))
  }
  useEffect(() => {
    getPerson()
  }, []);

  return (
    <div className="container">
      <Table 
        person={person}
        getPerson={getPerson}
      />
      <button onClick={() => setShowAdd(true)}>Добавить сотрудника</button>
      {showAdd ? <Add getPerson={getPerson} /> : null}
    </div>
  );
}

export default App;
