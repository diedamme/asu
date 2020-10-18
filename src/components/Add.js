import React, {useState} from 'react';
import Form from './Form';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

const Add = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createPerson = async (event) => {
    event.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      await axios.post('http://localhost:4000/person/', {firstName: firstName, lastName: lastName})
          .then( () => {
            props.closeAdd();
            props.getPerson();
          })
          .catch( error => {
            if (error.response.status === 400) {
              props.notification();
            } else if (error.response.status === 404) {
              props.notification('Сотрудник не найден в системе.');
            } else if (error.response.status === 500) {
              props.notification('Ошибка на стороне сервета.');
            }
          });
    } else {
      props.notification('Заполните пустые поля!', 'warning');
    }
  };

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  return (
    <>
      <Form
        title='Добавить сотрудника'
        closeForm={props.closeAdd}
        executeSubmit={createPerson}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        firstName={firstName}
        lastName={lastName}
      />
      <ReactNotification/>
    </>

  );
};

export default Add;
