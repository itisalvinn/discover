import React, {useState, useEffect} from 'react'
import {PlaylistItem} from './PlaylistItem'
import {getSearchResults, getSearchResultsMood, randomIndex} from '../songUtil/SongSearch'
import {Card, Button, makeStyles, CardHeader, IconButton, CardContent} from '@material-ui/core'
import {trackData} from '../../Context'
import RefreshIcon from '@material-ui/icons/Refresh'
import axios from 'axios'

// get list of searched song items
// for each song, check their valence, dancability etc. and filter them by some threshold -- rework this to just retrieve random 10 playlists, then randomly choose a playlist and grab 5 songs from it?
// grab up to 5 resultant tracks
// pass them into playlist item and display them accordingly

const useStyles = makeStyles({
    card : {
        display: 'block',
        backgroundColor: '#1DB954',
        width: '95%',
        height: '20vw',
    },
    content : {
        height: '15vw',
        overflowY: 'scroll',
    },
    scrollDiv : {
        width: "100%",
        // overflowY: 'scroll',
    }
})

export const HappyCard = () => {

    const [songData, setSongData] = useState<trackData[]>([]);
    const [happySongs, setHappySongs] = useState<string[]>([]);

    const styles =  useStyles();
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        // retrieve list of playlist from promise and add 10 random tracks from a randomly selected playlist
        getSearchResultsMood(access_token, "Happy").then(result => {
            console.log(result);
            let idx = randomIndex(0, result.length);
            getRandomTracksFromPlaylist(access_token, result[idx].id);
            console.log(result[idx]);
        })
    }, [])

    var searchResults2: any = [];

    const loopOver = () => {
        getRandomTracksFromPlaylist(access_token, '3AhUYjFT0tcC4sOJFhIkgP');
    }

    // add a 'happy' song into list of happy songs based on their audio features
    const getHappyFeatures = (token: any, track: trackData) => {
        axios({
            url: 'https://api.spotify.com/v1/audio-features/' + track.id,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(resp => {return resp.data})
            .then(data => {
            console.log("features");
            console.log(data);
            if(data.tempo > 99 && data.mode == 1) {
                console.log("happy song");
                console.log(data.id);
                setHappySongs([...happySongs, data.id]);
            }
        })
        .catch(err => {
            console.log('Error', err);
        });
    }

    /* add random tracks into state from a playlist
     * :param: token : any
     * :param: playlistId : string
     */ 
    const getRandomTracksFromPlaylist = (token: any, playlistId: string) => {
        axios({
            url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(resp => {return resp.data.items})
            .then(data => {
                let happySongIds = new Set();
                for(let i = 0; i < data.length; i++){
                    let idx = randomIndex(0, data.length);
                    // add song into set given it is not 'full' and preview url exists
                    // we don't want the user to get an empty playback
                    if(!happySongIds.has(data[idx].track.name) && happySongIds.size < 10 && data[idx].track.preview_url != null){
                        happySongIds.add(data[idx].track.name);
                        searchResults2.push({
                            id: data[idx].track.id,
                            pUrl: data[idx].track.preview_url,
                            name: data[idx].track.name,
                            albumArt: data[idx].track.album.images[0].url,
                            artist: data[idx].track.artists[0].name,
                        })
                    }
                    // console.log(data[idx].track);
                    // console.log(data[idx].track.preview_url);
                }
                setSongData(searchResults2);
            })
        .catch(err => {
            console.log('Error', err);
        });
    }

    return (
        <Card className={styles.card}>
            <CardHeader
                title="Placeholder" // place holder, will probably use track or album art
                action={
                    <IconButton onClick={()=>loopOver()} aria-label="refresh-songs">
                        <RefreshIcon/>
                    </IconButton>
                }
            />
            <CardContent className={styles.content} >
                <div className={styles.scrollDiv}>
                    {songData.map((res: trackData, key) =>
                        <PlaylistItem data={res}/>
                    )}
                <Button onClick={()=> loopOver()}>
                    yo
                </Button>
                </div>
            </CardContent>
        </Card>
    )
}