import React, {useState, useEffect, useRef} from 'react'
import {Card, makeStyles, CardContent, List, CardHeader, Button, IconButton} from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import {getRandomSearch} from '../songUtil/SongSearch'
import axios from 'axios';

// fetch a random set of ~ 20 songs
// determine 'mood' of the song based on their key and danceability / energy (?)
// also consider Valence (musical positiveness)

const useStyles = makeStyles ({
    card : {
        display: 'block',
        backgroundColor: '#1DB954',
        width: '95%',
        height: '95%',
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

    const [previewUrl, setPreviewUrl] = useState('');
    const [audioStatus, setAudioStatus] = useState(false);
    const audioRef = useRef<HTMLMediaElement>(null);

    const styles =  useStyles();
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        getProfile(access_token);
        getTrackInfo(access_token);
    }, [])

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

    // currently grabs only 1 track -- need to update function to grab 5 tracks and populate them individually in an audio div
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
                offset: 5, 
                limit: 1, //get 1 track for now
                // available_market: 'US'
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
                setPreviewUrl(data.tracks.items[0].preview_url);
                console.log(data.tracks.items);
            })
        .catch(err => {
            console.log(err);
        });
    }   

    // play track preview when hovering over album art
    const playTrack = () => {
        try {
            if(audioRef.current != null){
                audioRef.current.play();
            }
            setAudioStatus(true);
        }catch(e){
            console.log(e);
        }
    }

    const stopTrack = () => {
        try {
            if(audioRef.current != null){
                audioRef.current.load();
            }
            setAudioStatus(false);
        }catch(e){
            console.log(e);
        }
    }

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
                <List className={styles.trackContainer}>
                    The first tracks is {tracks} <br/>
                    The audio status wrt to mouse thing is {audioStatus}     
                </List>
                <div>
                    <audio ref={audioRef} src={previewUrl}/>
                    <img className={styles.album} onMouseEnter={()=> playTrack()} onMouseLeave={()=> stopTrack()} src={imageData}/> <br/>
                </div>
            </CardContent>
        </Card>
    )
}