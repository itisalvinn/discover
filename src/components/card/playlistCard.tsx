import React, {useState, useEffect} from 'react'
import {Card, makeStyles, CardContent, List, CardHeader, Button, IconButton} from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import {getRandomSearch} from '../songUtil/songSearch'
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
    },
    album : {
        width: '100px',
        height: '100px',
    }
})

export const PlaylistCard = () => {
    const [responseData, setResponseData] = useState('123');
    const [tracks, setTracks] = useState<string[]>([]);
    const [imageData, setImageData] = useState('');
    const [uri, setUri] = useState('');
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

    const getTrackInfo = (token : any) => {
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
                offset: 3, 
                limit: 1, //get 1 track for now
            }
        })
        .then(resp => {return resp.data})
            .then((data) =>{
                // data contains tracks, href, next page
                // items contains up to '${limit}' tracks, each track has album/artist/id/name/
                let trackArray:string[] = [];
                for(let i = 0; i < data.tracks.items.length; i++){
                    trackArray.push(data.tracks.items[i].id + " "); 
                }
                setTracks(trackArray);
                setImageData(data.tracks.items[0].album.images[0].url);
                setUri(data.tracks.items[0].href);
                console.log(data.tracks.items);
            })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getProfile(access_token);
        getTrackInfo(access_token);
    }, [])

    const getAlbumArt = () => {

    }

    // how tf do i play music with dis ?????
    const playTrack = (uri: any, token: any) => {
        axios({
            url: `${uri}`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    const access_token = localStorage.getItem('access_token')

    return (
        <Card className={styles.card}>
            <CardHeader
                title="Happy" // place holder, will probably use track or album art
                action={
                    <IconButton onClick={()=> getTrackInfo(access_token)} aria-label="refresh-songs">
                        <RefreshIcon/>
                    </IconButton>
                }
            />
            <CardContent>
                <Button
                    onClick={() => getTrackInfo(access_token)}
                > testing 123
                </Button>
                <Button>
                    play button
                </Button>
                <List className={styles.trackContainer}>
                    The first tracks is {tracks} <br/>
                    <img className={styles.album} src={imageData}/> <br/>
                    Username is {responseData}
                </List>
            </CardContent>
        </Card>
    )
}