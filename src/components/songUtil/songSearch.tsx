import axios from 'axios'

// not used atm
export const getRandomParam = () => {
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

// not used atm
// random number from min up to (but not equal to) max
export const randomIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// not used atm
// search for some random input {track, playlist, artist etc.}
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
            q: getRandomParam(),
            type: 'track',
            offset: 5, 
            limit: 10,
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

// WIP come back to this later
// add a 'happy' song into list of happy songs based on their audio features
// (token: any, track: trackData)
// const getHappyFeatures = (token: any) => {
//     axios({
//         url: 'https://api.spotify.com/v1/audio-features/' + 'place holder id',
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//     })
//     .then(resp => {return resp.data})
//         .then(data => {
//         console.log("features");
//         console.log(data);
//         if(data.tempo > 99 && data.mode == 1) {
//             console.log("happy song");
//             console.log(data.id);
//             // setHappySongs([...happySongs, data.id]);
//         }
//     })
//     .catch(err => {
//         console.log('Error', err);
//     });
// }

// grab results for 10 playlists given a specific mood input
export const getSearchResultsByMood = (token: any, mood: string) => {
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
            offset: randomIndex(0,8),  // fix offset
            limit: 10,
            available_market: 'US'
        }
    })
    .then(resp => {return resp.data})
        .then((data) =>{
            // return an array of song items
            // console.log("items");
            // console.log(data.playlists.items);
            return data.playlists.items;
        })
    .catch(err => {
        console.log('Error', err);
    });
    return response;
}