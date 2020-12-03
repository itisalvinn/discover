import React from 'react'
import axios from 'axios'

export const getRandomSearch = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const randChar = chars.charAt(Math.floor(Math.random() * chars.length));
    let randSearch = ''; 

    // off set because Spotify prioritizes more famous artists / tracks 
    if(Math.round(Math.random()) > 0){
        randSearch = randChar + '%';
    } 
    else{
        randSearch = '%' + randChar +'%';
    }

    return randSearch;
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
            limit: 2, //get 1 track for now
            // available_market: 'US'
        }
    })
    .then(resp => {return resp.data})
        .then((data) =>{
            // data contains tracks, href, next page
            // items contains up to '${limit}' tracks, each track has album/artist/id/name/
            // let trackArray:string[] = [];
            // for(let i = 0; i < data.tracks.items.length; i++){
            //     trackArray.push(data.tracks.items[i].id); 
            // }

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

// get audio features
export const getAudioFeatures = (token: any) => {

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