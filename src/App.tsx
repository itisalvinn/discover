import React, {useState} from 'react'
import './App.css'
import {Login} from './components/auth/LoginPage'
import {PlayerContext} from './Context'

// add login page + redirect to main
// add different moods -- create playlists based on selected mood
// add some footer thingy later
// TODO: fix context provider to take in set state thingy

function App() {

  return (
    <PlayerContext.Provider value={''}>
      <div>
        <Login/>
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
