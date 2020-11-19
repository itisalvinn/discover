import React, {useContext} from 'react'
import './App.css'
import {Login} from './components/auth/LoginPage'
import {PlayerContext} from './Context'

// TODO: add different moods -- create playlists based on selected mood
// TODO: add some footer thingy later
// TODO: fix context later -- using local storage for now 

function App() {

  const playerContext = useContext(PlayerContext)

  return (
    <PlayerContext.Provider value={playerContext}>
      <div>
        <Login/>
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
