import React from 'react';
import TaskMenu from './components/TaskMenu';
import WaterMark from './components/WaterMark';

const MainPage = () => {
  return (
    <>
     <h1>Task Manager Application</h1>
     <TaskMenu />
     <WaterMark />
    </>
  )
}

export default MainPage