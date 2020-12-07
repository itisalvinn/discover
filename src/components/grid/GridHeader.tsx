import React, {useState, useEffect} from 'react'
import {makeStyles, IconButton} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios'

// add option for coffee shop noises / rain / thunder with volume slider !!

const useStyles = makeStyles ({
    pageHeader : {
        display: 'flex',
        flexDirection: 'row',
        height: '50px',
    },
    pageTitle : {
        color: '#fff',
        margin: '0px 90px 10px',
        fontSize: '2.5em',
        width: '80%',
        zIndex: 10,
    },
    logo : {
        float: 'left',
        position: 'fixed',
        borderRadius: '30px',
        background: 'linear-gradient(45deg, #FE6B8B 35%, #FF8E53 80%)',
        textAlign: 'center',
        marginLeft: '35px',
        marginTop: '15px',
        width: '30px',
        height: '30px',
    },
    pageHeaderRight : {
        color: '#fff',
        float: 'right',
        alignSelf: 'flex-end',
    }
})


export const GridHeader = () => {
    
    const [displayName, setDisplayName] = useState('');
    const styles = useStyles();
    const access_token = localStorage.getItem('access_token');

    useEffect(()=>{
        getProfile(access_token);
    })

    // profile deets
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
                setDisplayName(data.display_name);
        });
    }

    const refreshSession = () => {
        localStorage.removeItem('access_token');
        window.location.reload(false);
    }

    const logout = () => {
        // TODO later
    }
    return (
        <div className={styles.pageHeader}>
            <div className={styles.logo}></div> 
            <h1 className={styles.pageTitle}>Mood</h1>
            {/* right side drop down -> clear cache / log out of spotify */}
            <div className={styles.pageHeaderRight}>
                <span className="username">{`${displayName}`}</span>
                <IconButton>
                    <SettingsIcon/>
                </IconButton>
            </div>
        </div>
    )
}