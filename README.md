# pwa-navigator

> React navigator for a pwa.

[![NPM](https://img.shields.io/npm/v/pwa-navigator.svg)](https://www.npmjs.com/package/pwa-navigator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save pwa-navigator
```

## Usage

In App.ts import the Route provider from pwa-navigator and add the component with the routes as a child. Import the pwa stylesheet by adding a `import 'pwa-navigator/dist/index.css';`

```tsx
import React from 'react'

import 'pwa-navigator/dist/index.css'
import { RouteProvider } from 'pwa-navigator'
import Application from './navGroups/Application'

const App = () => {
  return (
    <RouteProvider>
      <Application />
    </RouteProvider>
  )
}

export default App
```

Import Navigator and Route from pwa-navigator. The default transition is a slide transition. When you want to change that behaviour to a stack transition add the `childrenTransition` property to the parent and give it the `stack` value.

```tsx
import React from 'react'
import { Navigator, Route } from 'pwa-navigator'
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
    <Navigator>
      <Route url='' component={MatchesScreen} childrenTransition='stack'>
        <Route url=':uuid' component={MatchScreen} childrenTransition='stack'>
          <Route url='video/:videoUuid' component={VideoScreen} />
          <Route url='music/:musicUuid' component={MusicScreen} />
        </Route>
        <Route url='tournaments' component={TournamentsScreen} />
      </Route>
      <Route url='feed' component={FeedScreen} />
      <Route url='profile' component={ProfileScreen} />
    </Navigator>
  )
}
export default Application
```

## License

MIT © [MaxEgg](https://github.com/MaxEgg)
