import React, {useState, useRef} from 'react'
import {Button, makeStyles} from '@material-ui/core'
import { FullscreenExit } from '@material-ui/icons';

const useStyles = makeStyles({
    album : {
        width: '100px',
        height: '100px',
        marginRight: '16px',
        '&:hover': {
            width: '105px',
            height: '105px',
        }
    },
    itemDiv : {
        display: 'flex',
        padding: '0.5rem',
    },
    artDiv : {
        gridColumn: 1/3,
    },
    infoDiv : {
        gridColumn: 2/3,
    },
    trackHeader : {
        lineHeight: '1em',
        margin: '0 0 0.6em',
        fontWeight: 500,
    }
})
export const PlaylistItem = ({data} : {data: any}) => {

    const styles =  useStyles();
    const [audioStatus, setAudioStatus] = useState(false);
    const audioRef = useRef<HTMLMediaElement>(null);

    const playTrack = () => {
        try {
            if(audioRef.current != null){
                audioRef.current.play();
            }
            setAudioStatus(true);
        }catch(e){
            console.log("error", e);
        }
    }

    const stopTrack = () => {
        try {
            if(audioRef.current != null){
                audioRef.current.load();
            }
            setAudioStatus(false);
        }catch(e){
            console.log("error", e);
        }
    }

    return (
        // want to display album art, song title, artist -- data.art, data.title, data.artist, data.previewUrl
        <div className={styles.itemDiv}>
            <audio ref={audioRef} src={data.pUrl}/>
            <div className={styles.artDiv}>
                <img className={styles.album} onMouseEnter={()=> playTrack()} onMouseLeave={()=> stopTrack()} src={data.albumArt}/>
            </div>
            <div className={styles.infoDiv}>
                <h4 className={styles.trackHeader}>{data.name}</h4>
                <span> {data.artist} </span>
            </div>
        </div>
    )
}