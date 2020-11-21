import React, {useState} from 'react'
import {Card, makeStyles, CardContent, List, CardHeader, Button} from '@material-ui/core'
import axios from 'axios';

// fetch a random set of ~ 20 songs
// determine 'mood' of the song based on their key and danceability / energy (?)
// also consider Valence (musical positiveness)

const useStyles = makeStyles ({
    card : {
        display: 'block',
        backgroundColor: '#1DB954',
        width: '100%',
        height: '100%',
    },
    trackContainer : {
        overflow: 'auto',
    }
})

export const PlaylistCard = () => {
    const [responseData, setResponseData] = useState('123');
    const [tracks, setTracks] = useState<string[]>([]);
    const styles =  useStyles();

    // test profile method
    const getProfile = (token: any) => {
        axios({
            url: 'https://api.spotify.com/v1/me',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.data)
            .then((data) =>{
                setResponseData(data.display_name);
                console.log(data.display_name);
        });
    }

    // get random tracks by creating search input with randomly chosen character
    const getRandomSearch = () => {
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

    const getTrack = (token : any) => {
        axios({
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
                offset: 10,
            }
        })
        .then(resp => resp.data)
            .then((data) =>{
                // data contains tracks, href, next page
                // items contains up to 20 tracks, each track has album/artist/id/name/
                let trackArray:string[] = [];
                for(let i = 0; i < data.tracks.items.length; i++){
                    trackArray.push(data.tracks.items[i].id + " "); 
                }
                setTracks(trackArray);
                console.log(data.tracks.items);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const playTrack = (url: string) => {

    }

    const access_token = localStorage.getItem('access_token')

    return (
        <Card className={styles.card}>
            <CardHeader
                title="Happy" // place holder, will probably use track or album art
            />
            <CardContent>
                <Button
                    onClick={() => getTrack(access_token)}
                > testing 123
                </Button>
                <List className={styles.trackContainer}>
                    The first 20 tracks are {tracks}
                </List>
            </CardContent>
        </Card>
    )
}