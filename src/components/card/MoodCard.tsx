import React, {useState, useEffect} from 'react'
import {PlaylistItem} from './PlaylistItem'
import {getSearchResultsByMood, randomIndex} from '../songUtil/SongSearch'
import {Card, makeStyles, CardHeader, IconButton, CardContent, Tooltip, Fab} from '@material-ui/core'
import {trackData} from '../../Context'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { FullscreenExit } from '@material-ui/icons'

//TODO: update card and content UI - need dis to look SECKSI
//TODO: set 'loading' view when api is still retrieving the value so card content doesn't appear blank
//TODO: add transparent scroll bar
// test playlist ID = 3AhUYjFT0tcC4sOJFhIkgP

const useStyles = makeStyles({
    card : {
        display: 'block',
        backgroundColor: '#c9ada7',
        width: '95%',
        height: '410px',
    },
    cardHeader : {
        borderBottom:  '3px solid',
        borderBottomColor: '#333246',
    },
    headerDescription : {
        color: 'red',
    },
    scrollDiv : {
        width: "100%",
        height: '260px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&:hover': {
            '&::-webkit-scrollbar-track': {
                // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                backgroundColor: 'rgba(0,0,0,.1)',
                transition: 'opacity 0.5s 0.5s',
                opacity: 1,
            },
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
        }
    },
    loadingModal : {
      display: 'flex',
      margin: 'auto',  
    },
    addToPlaylist : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5px',
        marginBottom: '5px',
    },
    openPlaylistBtn : {
        backgroundColor: '#f2e9e4',
        marginRight: '3px',
        marginLeft: '3px',
    },
    followPlaylistBtn : {
        backgroundColor: '#f2e9e4',
        marginRight: '3px',
        marginLeft: '3px',
    },
})

export const MoodCard = ({mood} : {mood : string[]}) => {

    const [songData, setSongData] = useState<trackData[]>([]);
    const [currPlaylistId, setCurrPlaylistId] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const styles =  useStyles();
    const access_token = localStorage.getItem('access_token');
    var searchResults: any = [];

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // try with async await on getSearchResultsMood
        getPlaylistCardData();
    }, [])

    /* load random playlist retrieved from promise
     * :param: none
     */
    const getPlaylistCardData = () => {
        getSearchResultsByMood(access_token, mood[randomIndex(0,mood.length)]).then(result => {
            let idx = randomIndex(0, result.length);
            getRandomTracksFromPlaylist(access_token, result[idx].id);
            setCurrPlaylistId(result[idx].id);
            setLoading(false)
        })
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
                for(let i = 0; i < data.length-1; i++){
                    let idx = randomIndex(0, data.length);

                    // because some playlists have null track id's :(
                    if(data[idx].track.id === null){
                        continue;
                    }

                    // add song into set given it is not 'full' and preview url exists
                    // also b/c we don't want the user to get an empty playback
                    if(!happySongIds.has(data[idx].track.id) && happySongIds.size < 10 && data[idx].track.preview_url != null){
                        happySongIds.add(data[idx].track.id);
                        searchResults.push({
                            id: data[idx].track.id,
                            pUrl: data[idx].track.preview_url,
                            name: data[idx].track.name,
                            albumArt: data[idx].track.album.images[0].url,
                            artist: data[idx].track.artists[0].name,
                            trackUrl: data[idx].track.external_urls.spotify,
                        })
                    }
                }
                setSongData(searchResults);
            })
        .catch(err => {
            console.log('Error', err);
        });
    }

    /* refresh playlist in the mood card
     * :param: none
     */
    const refreshPlaylist = () => {
        setLoading(true);
        getPlaylistCardData();
        // should check if user is already following the playlist first 
        if (success){
            setSuccess(!success);
        }
    }

    /* open playlist currently used in the mood card
     * :param: playlistId : string
     */
    const openPlaylist = (playlistId : string) => {
        let playlistUrl = 'https://open.spotify.com/playlist/' + playlistId;
        const navigateToTrackUrl = window.open(playlistUrl, '_blank', 'noopener,noreferrer');
        // reset the opener when user can successfully navigate to new tab
        if(navigateToTrackUrl) {
            navigateToTrackUrl.opener = null;
        }
    }

     /* follow playlist currently used in the mood card
      * :param: token : access_token
      * :param: playlistId : string
      */
    const followPlaylist = (token : any, playlistId : string) => {
        axios({
            url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/followers',
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: {
                'public' : false,
            }
        })
        setSuccess(true);
    }

    return (
        <Card className={styles.card}>
            <CardHeader
                title={mood[0]}
                className={styles.cardHeader}
                action={
                    <IconButton onClick={()=>refreshPlaylist()} aria-label="refresh-songs">
                        <RefreshIcon/>
                    </IconButton>
                }
            />
            <CardContent>
                {/* may not need loading modal consider how fast spotify api retrieves data?  */}
                {loading && <CircularProgress className={styles.loadingModal}/>}
                {!loading && <>
                    <div className={styles.scrollDiv}>
                        {songData.map((track: trackData, key) =>
                            <PlaylistItem data={track}/> 
                        )}
                    </div>
                    <div className={styles.addToPlaylist}>
                        <Tooltip title="Open complete playlist on Spotify">
                            <Fab className={styles.openPlaylistBtn} size="medium" aria-label="open-playlist">
                                <OpenInNewIcon onClick={()=> openPlaylist(currPlaylistId)}/>
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Follow this playlist">
                            <Fab className={styles.followPlaylistBtn} onClick={() => followPlaylist(access_token, currPlaylistId)} size="medium" aria-label="follow-playlist">
                                {success ? <CheckIcon/> : <AddIcon/>}
                            </Fab>
                        </Tooltip>
                    </div></>
                }
            </CardContent>
        </Card>
    )
}