import React from 'react';
import meLirik from '../images/meLirik.png';
import './MadeByMeSeal.css';

const WaterMark = () => {
  return (
    <div className='myself'>
      <p>Made By</p>
      <img src={ meLirik } alt="Boy pointing to himself" aria-label='madeByMeSeal' />
  </div>
  )
}

export default WaterMark;