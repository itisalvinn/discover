import React, {useState} from 'react'
import {makeStyles, Button, Container} from "@material-ui/core"
import {Grid} from '../grid/Grid'
import {GridHeader} from '../grid/GridHeader'

const useStyles = makeStyles ({
    loginBase : {
        backgroundColor: '#282c34',
        minHeight: '100%',
        width: '100%',
        position: 'fixed',
        alignItems: 'normal',
        margin: 0,
    },
    gridBase : {
        // todo: update colours
        backgroundColor: '#333246',
        minHeight: '100%',
        width: '100%',
        position: 'fixed',
    },
    content : {
        width: '50%',
        float: 'left',
        paddingLeft: '100px',
        paddingRight: '60px',
        marginTop: '300px',
        alignItems: 'flex-start',
    },
    header : {
        fontSize: '3.2em',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    subheader : {
        fontSize: '2em',
        fontWeight: 400,
        marginBottom: '20px',
    },
    me : {
        fontSize: '1em',
        fontWeight: 200,
        marginBottom: '20px',
    },
    loginButton : {
        padding: '10px 30px',
        borderRadius: 30,
        '&:hover': {
            backgroundColor: '#1DB954',
        }
    },
});

// spotify auth variables
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri =  process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  'user-read-private',
  'streaming',
  'user-read-currently-playing',
  'user-read-email',
];

// get spotify hash
const getHash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function(initial: { [key: string]: any; }, item){
          if(item){
              var parts = item.split("=");
              initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
      }, {});

window.location.hash = "";

// set token
let _token = getHash.access_token;
localStorage.setItem('access_token', _token);
// const myToken = localStorage.getItem('token');

export const Login = () =>{

    const styles = useStyles();

    return(
        <div>
            {/* before login */}
            {!_token && (<div className={styles.loginBase}> 
                <Container className={styles.content}>
                    <header className={styles.header}>
                        Mood
                    </header>
                    <header className={styles.subheader}>
                        music for the moment
                    </header>
                    {/* <header className={styles.me}>
                        smol project by Alvin
                    </header> */}
                    <Button
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`}
                        variant="contained"
                        className={styles.loginButton}
                        size="large">
                        Login to Spotify
                    </Button>
                </Container>
            </div>)}

            {/* after login */}
            {_token && (<div className={styles.gridBase}>
                {/* for testing purposes remove after <text> {`the token thing is + ${myToken}`} </text> */}
                <GridHeader/>
                <Grid/>
            </div>)}
        </div>
    )
}