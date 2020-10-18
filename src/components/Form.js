import React from 'react';

const Form = (props) => {
  return (
    <div className='form'>
      <div className='background' onClick={() => props.closeForm()}></div>
      <form onSubmit={(event) => props.executeSubmit(event)}>
        <div className='form-title'>
          {props.title}
        </div>
        <div className='form-body'>
          <span onClick={() => props.closeForm()}>Назад к списку</span>
          <input
            value={props.firstName}
            onChange={event => props.onChangeFirstName(event)}
            placeholder='Введите имя сотрудника'/>
          <input
            value={props.lastName}
            onChange={event => props.onChangeLastName(event)}
            placeholder='Введите фамилию сотрудника'/>
          <button>
            {props.buttonTitle || 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
