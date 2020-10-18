import React, {useState, useEffect} from 'react';
import Table from './components/Table';
import Add from './components/Add';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [person, setPerson] = useState([]);

  const notification = (message = 'Неверный запрос.', type = 'danger') => {
    return store.addNotification({
      title: 'Ошибка!',
      message: message,
      type: type,
      container: 'top-right',
      insert: 'bottom',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 5000,
        showIcon: true
      }
    });
  };

  const getPerson = async () => {
    await axios.get('http://localhost:4000/person').then( response => setPerson(response.data))
        .catch( error => {
          if (error.response.status === 400) {
            notification();
          } else if (error.response.status === 404) {
            notification('Сотрудник не найден в системе.');
          } else if (error.response.status === 500) {
            notification('Ошибка на стороне сервета. Повторите позднее.');
          }
        });
  };
  useEffect(() => {
    getPerson();
  }, []);
  const closeAdd = () => {
    setShowAdd(false);
  };

  return (
    <div className='container'>
      <ReactNotification/>
      <Table
        person={person}
        getPerson={getPerson}
        notification={notification}
      />
      <button
        onClick={() => setShowAdd(true)}>
        Добавить сотрудника
      </button>
      {showAdd ?
      <Add
        getPerson={getPerson}
        closeAdd={closeAdd}
        notification={notification}
      /> :
      null}
    </div>
  );
}

export default App;
