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

  const notification = (message, type = 'danger') => {
    return store.addNotification({
      title: 'Ошибка!',
      message: message,
      type: type,
      container: 'bottom-left',
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
    try {
      const response = await axios.get('http://localhost:4000/person');
      setPerson(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          notification('Неверный запрос.');
        } else if (error.response.status === 404) {
          notification('Сотрудник не найден в системе.');
        } else if (error.response.status === 500) {
          notification('Ошибка на стороне сервера.');
        }
      } else if (error.request) {
        notification('Ошибка сети.');
      } else {
        notification('Внутренняя ошибка приложения.');
      }
    }
  };
  useEffect(() => {
    getPerson();
  }, []);
  const closeAdd = () => {
    setShowAdd(false);
  };

  return (
    <div className='container'>
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
      <ReactNotification/>
    </div>
  );
}

export default App;
