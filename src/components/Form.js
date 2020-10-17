import React from 'react'

const Form = (props, onChangeFirstName, onChangeLastName) => {
  const executeSubmit = (event) => {
    event.preventDefault();
  }

    return (
        <div className="popUp">
        <div className="background" onClick={() => props.closeForm()}></div>
        <form className="popUp__all" onSubmit={() => executeSubmit()}>
          <div className="popUp-title">
            {props.title}
          </div>
          <div className="popUp-body">
            <span onClick={() => props.closeForm()}>Назад к списку</span>
          <input value={props.firstName} onChange={event => onChangeFirstName(event.target.value)} placeholder="Введите имя сотрудника"/>
        <input value={props.lastName} onChange={event => onChangeLastName(event.target.value)} placeholder="Введите фамилию сотрудника"/>
        <button onClick={() => props.executeSubmit()}>Сохранить</button>
          </div>
        </form>
      </div>
    )
}

export default Form
