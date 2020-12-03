import React from 'react'

export type trackData = {
    id: Number,
    pUrl: string,
    name: string,
}

// data from https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
export type trackFeatures = {
    key: Number, // Pitch class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1)
    mode: Number, // Major is represented by 1 and minor is 0
    danceability: Number, // value of 0.0 is least danceable and 1.0 is most danceable; greatest distribution b/w 0.5 ~ 0.7 
    energy: Number, // measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity
    valence: Number, // measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track
}

// drop this for now 
export const PlayerContext = React.createContext({
    spotifyToken: 'default value',
    setSpotifyToken: () =>{},
});
