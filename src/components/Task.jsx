import axios from 'axios';
import React, { useState } from 'react';
import './Task.css';


const Task = ({ task: { id, date, time, title, details, status, createdAt }}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timeState, setTime] = useState('');
  const [dateState, setDate] = useState('');
  const [titleState, setTitle] = useState('');
  const [detailsState, setDetails] = useState('');
  const [statusState, setStatus] = useState('pending');

  function handleTimeChange ({target}) {
    setTime(target.value);
  }

  function handleDateChange ({target}) {
    setDate(target.value);
  }

  function handleTitleChange ({target}) {
    setTitle(target.value);
  }

  function handleDetailsChange ({target}) {
    setDetails(target.value);
  }

  function handleStatusChange ({target}) {
    setStatus(target.value);
  }

  async function handleUpdateTaskButton () {
    await axios.put(process.env.REACT_APP_TODOLIST_ENDPOINT,
      { 
        id,
        title: titleState.length > 0 ? titleState : title,
        details: detailsState.length > 0 ? detailsState : details,
        date: dateState.length > 0 ? dateState : date,
        time: timeState.length > 0 ? timeState : time,
        status: statusState.length > 0 ? statusState : status})
      .then(res => {
        if (res.status === 200) {

        }
      })
      .catch(err => console.log(err));
  }

  function editTaskButton () {
    setIsDisabled(!isDisabled);
  }

  async function deleteTaskButton () {
    axios.delete(`${process.env.REACT_APP_TODOLIST_ENDPOINT}${id}`)
    .then(res => {
      if (res.status === 204) {

      }
    })
    .catch(err => console.log(err));
  }

  function whatToRender() {
    return (
      isDisabled ? (
        <div>
          <h3 data-testid={ `taskTitle${ id }` }>{title}</h3>
          <p data-testid={ `taskDetail${ id }` }>{details}</p>
          <div>
            <p data-testid={ `taskDate${ id }` }>{date}</p>
            <p data-testid={ `taskTimestamp${ id }` }>{time}</p>
          </div>
          <p data-testid={ `taskStatus${ id }` } className={ status === "done" ? "blueTask" : "yellowTask" } >{status}</p>
          <p data-testid={ `taskCreationDate${ id }` }>{createdAt}</p>
        </div>) : (
          <div>
            <input type="date" name="date" data-testid={ `taskDate${ id }` } aria-label={ `taskDate${ id }` } placeholder={ date } onChange={ handleDateChange } />
            <input type="time" name="time" data-testid={ `taskTimestamp${ id }` } placeholder={ time } onChange={ handleTimeChange } />
            <input type="text" name='title' data-testid={ `taskTitle${ id }` } placeholder={ title } onChange={ handleTitleChange } />
            <input type="text" name="details" data-testid={ `taskDetail${ id }` } placeholder={ details } onChange={ handleDetailsChange } />
            <label htmlFor="status">Status:</label>
            <select id="status" data-testid={ `taskStatus${ id }` } placeholder={ status } onChange={ handleStatusChange }>
              <option value="pending">pending</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
            <button aria-label='update task' onClick={ handleUpdateTaskButton }>update task</button>
          </div>
        )
      
    )
  }

  return (
    <div className='taskMainDiv'>
      { whatToRender() }
      <button data-testid={`updateTask${id}`} onClick={ editTaskButton }>edit task</button>
      <button data-testid={`deleteTask${id}`} onClick={ deleteTaskButton }>delete task</button>
    </div>
  )
}

export default Task