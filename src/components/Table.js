import React, {useState} from 'react';
import axios from 'axios';
import Change from '../components/Change';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

const Table = (props) => {
  const [showChange, setShowChange] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [activeFirstName, setActiveFirstName] = useState('');
  const [activeLastName, setActiveLastName] = useState('');

  const deletePerson = async (id) => {
    await axios.delete(`http://localhost:4000/person/${id}`)
        .then( () => {
          props.getPerson();
        })
        .catch( error => {
          if (error.response.status === 400) {
            props.notification();
          } else if (error.response.status === 404) {
            props.notification('Сотрудник не найден в системе.');
          } else if (error.response.status === 500) {
            props.notification('Ошибка на стороне сервета. Повторите позднее.');
          }
        });
  };

  const closeChange = () => {
    setShowChange(false);
  };

  const itemChange = (id, firstName, lastName) => {
    setShowChange(true);
    setActiveId(id);
    setActiveFirstName(firstName);
    setActiveLastName(lastName);
  };

  return (
    <div className='table'>
      <ReactNotification/>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th></th>
          </tr>
          {props.person.map((item, index) => {
            return (
              <tr
                key={index}
              >
                <td>
                  <span className='material-icons'>account_circle</span>
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <span
                    onClick={() => {
                      return itemChange(item.id, item.firstName, item.lastName);
                    }}
                    className='material-icons'>
                    create
                  </span>
                  <span
                    onClick={() => deletePerson(item.id)}
                    className='material-icons'>
                    clear
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showChange ?
      <Change
        id={activeId}
        firstName={activeFirstName}
        lastName={activeLastName}
        getPerson={props.getPerson}
        closeChange={closeChange}
        notification={props.notification}
      /> :
      null}
    </div>
  );
};

export default Table;
