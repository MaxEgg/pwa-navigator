import { Link } from 'pwa-navigator'
import React from 'react'

const TournamentsScreen = () => {
  return (
    <div className='screen'>
      <div className='title'>Tournaments</div>
      <div className='content'>
        <Link to='/public'>Public</Link>
        <Link to='/tournaments'>Tournaments</Link>
        <div>Tournaments</div>
      </div>
    </div>
  )
}

export default TournamentsScreen
