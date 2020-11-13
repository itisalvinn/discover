import React from 'react'

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri =  process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const scopes = [
  'user-read-private',
  'streaming',
  'user-read-currently-playing',
  'user-read-email',
];

// get hash of url
const getHash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function(initial: { [key: string]: any; }, item){
          if(item){
              var parts = item.split("=");
              initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
      }, {});

window.location.hash = "";

// set token
let _token = getHash.access_token;

export const Authentication = () =>{

    return(
        <div>
            <header className="App-header">
            {!_token && (<a className="btnLogin" href = {`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`}>Login to Spotify</a>)}

            </header>
            <a>{`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`}</a>
            <a>{`this is the token : ${_token} blah blah blah blah123 123 123 123`}</a>
        </div>
    )
}