import React, {useContext} from 'react'
import './App.css'
import {Login} from './components/auth/LoginPage'
import {PlayerContext} from './Context'

// TODO: add footer 
// TODO: fix context -- won't need for now

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
