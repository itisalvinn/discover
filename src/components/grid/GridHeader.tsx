import React, {useState, useEffect} from 'react'
import {makeStyles, IconButton, Menu, MenuItem} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios'

// add option for coffee shop noises / rain / thunder with volume slider !!
// create a sticky header
// need to further style settings menu drop down (put it under the button and make it less chunky)

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
    },
    menuItem : {
        transform: "translate(0,-50%)"
    }
})

export const GridHeader = () => {
    
    const [displayName, setDisplayName] = useState('');
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const styles = useStyles();
    const access_token = localStorage.getItem('access_token');

    useEffect(()=>{
        getProfile(access_token);
    },[])

    // profile details of user
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

    const handleClick = (event : any) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const refreshSession = () => {
        localStorage.removeItem('access_token');
        window.location.reload(false);
    }
 
    const logout = () => {
        // TODO later
        // send user to accounts.spotify.com/logout (?) 
        alert('logged out!');
    }

    return (
        <div className={styles.pageHeader}>
            <div className={styles.logo}></div> 
            <h1 className={styles.pageTitle}>Mood</h1>
            <div className={styles.pageHeaderRight}>
                <span className="username">{`${displayName}`}</span>
                <IconButton aria-controls="dropdown-menu" aria-haspopup="true" onClick={handleClick}>
                    <SettingsIcon/>
                </IconButton>
                <Menu
                    id="dropdown-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={refreshSession}> Restart session </MenuItem>
                    <MenuItem onClick={logout}> Logout of Spotify </MenuItem>
                </Menu>
            </div>
        </div>
    )
}