import React, {useState, useEffect} from 'react'
import {PlaylistItem} from './PlaylistItem'
import {getSearchResults} from '../songUtil/SongSearch'
import {Card, Button} from '@material-ui/core'
import {trackData, trackFeatures} from '../../Context'
import axios from 'axios'

// get list of searched song items
// for each song, check their valence, dancability etc. and filter them by some threshold
// grab up to 5 resultant tracks
// pass them into playlist item and display them accordingly

export const HappyCard = () => {

    const [loading, setLoading] = useState(true);
    const [songId, setSongId] = useState<trackData[]>([]);
    const [happySongs, setHappySongs] = useState<trackFeatures[]>([]);

    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        // push X songs into the array 
        getSearchResults(access_token).then(result => {
            result.map((songInfo: any) =>
                searchResults.push({
                    id: songInfo.id,
                    pUrl: songInfo.preview_url,
                    name: songInfo.name,
                })
            );
            setSongId(searchResults);
        });
    }, [])

    var  searchResults: any = [];

    const loopOver = () => {
        console.log(songId);
        getHappySong(access_token, songId[0]);
    }

    // add a 'happy' song into list of happy songs
    const getHappySong = (token: any, track: trackData) => {
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
            }
        })
        .catch(err => {
            console.log('Error', err);
        });
    }

    return (
        <Card>
            <div>
                {songId.map((res: trackData, key) =>
                    // <text className={`song-${key}`}>{res}<br/></text>
                    <PlaylistItem data={res}/>
                )}
            <Button onClick={()=> loopOver()}>
                yo
            </Button>
            <text> meh </text>
            </div>
            {/* <PlaylistItem/>
            <PlaylistItem/>
            <PlaylistItem/>
            <PlaylistItem/>
            <PlaylistItem/> */}
        </Card>
    )
}