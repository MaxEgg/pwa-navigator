import React from 'react'
import 'pwa-navigator/dist/style.css'
import { RouteProvider } from "pwa-navigator";
import Auth from './navGroups/Auth';
import Application from './navGroups/Application';
import LoginProvider, { LoginContext } from './providers/LoginProvider';

const App = () => {
  return (
    <LoginProvider>
      <LoginContext.Consumer>
        {({ loggedIn }) => (
          <RouteProvider>
            {!loggedIn ? <Auth /> : <Application />}
          </RouteProvider>
        )}
      </LoginContext.Consumer>
    </LoginProvider>
  );
}

export default App
