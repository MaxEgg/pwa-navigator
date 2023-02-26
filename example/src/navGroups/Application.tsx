import React from 'react'
import { Link, Navigator, Route } from 'pwa-navigator'
import MatchesScreen from '../screens/MatchesScreen'
import PublicMatchesScreen from '../screens/PublicMatchesScreen'
import MatchScreen from '../screens/MatchScreen'
import VideoScreen from '../screens/VideoScreen'
import MusicScreen from '../screens/MusicScreen'
import TournamentsScreen from '../screens/TournamentsScreen'
import FeedScreen from '../screens/FeedScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Application = () => {
  return (
    <div className='applicationContainer'>
      <div className='applicationContent'>
        <Navigator>
          <Route url='' component={MatchesScreen}>
            <Route
              url='public'
              component={PublicMatchesScreen}
              childrenTransition='stack'>
              <Route url=':uuid' component={MatchScreen} childrenTransition='stack'>
                <Route url='video/:videoUuid' component={VideoScreen} />
                <Route url='music/:musicUuid' component={MusicScreen} />
              </Route>
            </Route>
            <Route url='tournaments' component={TournamentsScreen} />
          </Route>
          <Route url='feed' component={FeedScreen} />
          <Route url='profile' component={ProfileScreen} />
        </Navigator>
      </div>
      <div className='bottomMenu'>
          <div className='item'>
            <Link to='/feed'>feed</Link>
          </div>
          <div className='item'>
            <Link to='/'>matches</Link>
          </div>
          <div className='item'>
            <Link to='/profile'>profile</Link>
          </div>
        </div>
    </div>
  )
}

export default Application;