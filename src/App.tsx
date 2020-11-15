import React from 'react';
import './App.css';
import {Grid} from './components/grid/Grid';
import {Authentication} from './components/auth/Authentication';

// add login page
// add different moods -- create playlists based on selected mood

// got token -- _token, need to use this with subsequent spotify calls?
// move this token + url functionality into another class
// investigate issue with process.env variables
function App() {

  return (
    <div className="App">
      <Authentication/>
      <Grid/>
    </div>
  );
}

export default App;
