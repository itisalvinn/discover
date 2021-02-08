import React from 'react'

export type trackData = {
    id: string,
    pUrl: string,
    name: string,
    albumArt: string,
    artist: string,
    trackUrl: string,
}

// data from https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
// WIP -- will use these attributes later to determine mood ?
export type trackFeatures = {
    key: number, // Pitch class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1)
    mode: number, // Major is represented by 1 and minor is 0
    danceability: number, // value of 0.0 is least danceable and 1.0 is most danceable; greatest distribution b/w 0.5 ~ 0.7 
    energy: number, // measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity
    valence: number, // measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track
}

// drop this for now 
export const PlayerContext = React.createContext({
    spotifyToken: 'default value',
    setSpotifyToken: () =>{},
});
