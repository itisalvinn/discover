import React, {useState, useRef} from 'react'
import {makeStyles} from '@material-ui/core'

// display playlist info (album art, song title, artist) within the mood card

const useStyles = makeStyles({
    album : {
        width: '100px',
        height: '100px',
        marginRight: '16px',
        '&:hover': {
            width: '105px',
            height: '105px',
        },
        cursor: 'pointer',
    },
    itemDiv : {
        display: 'flex',
        padding: '0.5rem',
        borderBottom:  '1px solid',
        borderBottomColor: '#000000',
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
    },
})
export const PlaylistItem = ({data} : {data: any}) => {

    const styles =  useStyles();
    const [audioStatus, setAudioStatus] = useState(false);
    const audioRef = useRef<HTMLMediaElement>(null);

    const playTrack = () => {
        try {
            if(audioRef.current != null){
                audioRef.current.volume = 0.3;
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

    const openTrack = () => {
        const navigateToTrackUrl = window.open(data.trackUrl, '_blank', 'noopener,noreferrer');
        // reset the opener when user can successfully navigate to new tab
        if(navigateToTrackUrl) {
            navigateToTrackUrl.opener = null;
        }
    }

    return (
        // display album art, song title, artist -- data.art, data.title, data.artist, data.previewUrl
        <div className={styles.itemDiv}>
            <audio ref={audioRef} src={data.pUrl}/>
            <div className={styles.artDiv}>
                <img className={styles.album} onMouseEnter={()=> playTrack()} onMouseLeave={()=> stopTrack()} onClick={()=> openTrack()}src={data.albumArt}/>
            </div>
            <div className={styles.infoDiv}>
                <h4 className={styles.trackHeader}>{data.name}</h4>
                <span> {data.artist} </span>
            </div>
        </div>
    )
}