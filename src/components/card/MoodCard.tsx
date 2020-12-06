import React, {useState, useEffect} from 'react'
import {PlaylistItem} from './PlaylistItem'
import {getSearchResults, getSearchResultsMood, randomIndex} from '../songUtil/SongSearch'
import {Card, Button, makeStyles, CardHeader, IconButton, CardContent, CardMedia, Typography} from '@material-ui/core'
import {trackData} from '../../Context'
import RefreshIcon from '@material-ui/icons/Refresh'
import axios from 'axios'

//TODO: update card and content UI - need dis to look SECKSI

const useStyles = makeStyles({
    card : {
        display: 'block',
        backgroundColor: '#1DB954',
        width: '95%',
        height: '400px',
    },
    cardHeader : {
        borderBottom:  '3px solid',
        borderBottomColor: '#333246',
    },
    scrollDiv : {
        width: "100%",
        height: '275px',
        overflowY: 'scroll',
    }
})

export const MoodCard = ({mood} : {mood : string[]}) => {

    const [songData, setSongData] = useState<trackData[]>([]);
    const [happySongs, setHappySongs] = useState<string[]>([]);

    const styles =  useStyles();
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        // retrieve list of playlist from promise and add 10 random tracks from a randomly selected playlist
    getSearchResultsMood(access_token, mood[randomIndex(0,mood.length)]).then(result => {
            console.log(result);
            let idx = randomIndex(0, result.length);
            getRandomTracksFromPlaylist(access_token, result[idx].id);
            console.log(result[idx]);
        })
    }, [])

    var searchResults: any = [];

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
                    // b/c we don't want the user to get an empty playback
                    if(!happySongIds.has(data[idx].track.id) && happySongIds.size < 10 && data[idx].track.preview_url != null){
                        happySongIds.add(data[idx].track.id);
                        searchResults.push({
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
                setSongData(searchResults);
            })
        .catch(err => {
            console.log('Error', err);
        });
    }

    return (
        <Card className={styles.card}>
            <CardHeader
                title="Placeholder" // place holder, will probably use track or album art
                className={styles.cardHeader}
                action={
                    <IconButton onClick={()=>loopOver()} aria-label="refresh-songs">
                        <RefreshIcon/>
                    </IconButton>
                }
            />
            <CardContent>
                <div className={styles.scrollDiv}>
                    {songData.map((res: trackData, key) =>
                        <PlaylistItem data={res}/>
                    )}
                <Button onClick={()=> loopOver()}>
                    yo
                </Button>
                </div>
                <div>
                    helo hello
                </div>
            </CardContent>
        </Card>
    )
}