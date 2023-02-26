import { Link } from "pwa-navigator";
import React from "react";

const FeedScreen = () => {
  return (
    <div className='screen'>
      <div className='title'>Matches</div>
      <div className='content'>
        <Link to='/public'>Public</Link>
        <Link to='/tournaments'>Tournaments</Link>
        <div>Feed</div>
      </div>
    </div>
  )
}

export default FeedScreen;