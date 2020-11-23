import React from 'react'
import { setConstantValue } from 'typescript';

// drop this for now 
export const PlayerContext = React.createContext({
    spotifyToken: 'default value',
    setSpotifyToken: () =>{},
});
