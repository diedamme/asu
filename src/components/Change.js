import React, {useState} from 'react';
import Form from './Form';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';

const Change = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const putPerson = async (event) => {
    event.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      try {
        await axios.put(`http://localhost:4000/person/${props.id}`, {firstName: firstName.trim(), lastName: lastName.trim()});
        props.closeChange();
        props.getPerson();
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            props.notification('Неверный запрос.');
          } else if (error.response.status === 404) {
            props.notification('Сотрудник не найден в системе.');
          } else if (error.response.status === 500) {
            props.notification('Ошибка на стороне сервера.');
          }
        } else if (error.request) {
          props.notification('Ошибка сети.');
        } else {
          props.notification('Внутренняя ошибка приложения.');
        }
      }
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
        title='Редактирование сотрудника'
        closeForm={props.closeChange}
        executeSubmit={putPerson}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        firstName={firstName}
        lastName={lastName}
      />
      <ReactNotification/>
    </>
  );
};

export default Change;
