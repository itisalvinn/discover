import React from 'react'
import axios from 'axios'

export const getRandomSearch = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const randChar = chars.charAt(Math.floor(Math.random() * chars.length));
    let randSearch = ''; 

    // off set because Spotify prioritizes more famous artists / tracks 
    // look into Math.Round() as it conforms the numbers to a non-uniform distribution
    if(Math.round(Math.random()) > 0){
        randSearch = randChar + '%';
    } 
    else{
        randSearch = '%' + randChar +'%';
    }

    return randSearch;
}

export const randomIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// grab results for maybe 5 to 10 songs - return an array of song items?
export const getSearchResults = (token: any) => {
    const response = axios({
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            q: getRandomSearch(),
            type: 'track',
            offset: 5, 
            limit: 10, //get 1 track for now
            available_market: 'US'
        }
    })
    .then(resp => {return resp.data})
        .then((data) =>{

            // return an array of song items
            console.log("items");
            console.log(data.tracks.items);
            return data.tracks.items;
        })
    .catch(err => {
        console.log('Error', err);
    });
    return response;
}


// grab results for 10 songs given mood parameter
export const getSearchResultsMood = (token: any, mood: string) => {
    const response = axios({
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            q: mood,
            type: 'playlist',
            offset: randomIndex(0,15),  // fix offset
            limit: 10,
            available_market: 'US'
        }
    })
    .then(resp => {return resp.data})
        .then((data) =>{

            // return an array of song items
            console.log("items");
            console.log(data.playlists.items);
            return data.playlists.items;
        })
    .catch(err => {
        console.log('Error', err);
    });
    return response;
}

// profile deets
export const getProfile = (token: any) => {
    axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp => resp.data)
        .then((data) =>{
            console.log(data.display_name);
            // setResponse(data.display_name);
    });
}