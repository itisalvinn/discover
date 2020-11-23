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