import React, {useState} from 'react'
import {makeStyles, Button, Container} from "@material-ui/core";
import {Grid} from '../grid/Grid';

const useStyles = makeStyles ({
    base : {
        backgroundColor: '#282c34',
        minHeight: '100vh',
        width: '100%',
        position: 'fixed',
        alignItems: 'normal',
        margin: 0,
    },
    content : {
        width: '50%',
        float: 'left',
        paddingLeft: '50px',
        paddingRight: '40px',
        alignItems: 'flex-start',
    }
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

export const Authentication = () =>{

    const [responseData, setResponseData] = useState('');
    const styles = useStyles();

    // remove later -- test method to get base spotify profile info
    const getUserProfile = (token: string) => {
        fetch('https://api.spotify.com/v1/me',{
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        })
        .then(resp => resp.json())
            .then((data) =>{
                setResponseData(data.display_name);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    return(
        <div>
            {/* before login */}
            {!_token && (<div className={styles.base}> 
                <Container className={styles.content}>
                    <header>
                        Mood
                    </header>
                    <header>
                        music for the feels
                    </header>
                    <Button 
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`}
                        variant="contained"
                        className="btnLogin"
                        size="large">
                        Login to Spotify
                    </Button>
                </Container>
 
            </div>)}

            {/* after login */}
            {_token && (<div>
                <text> {`the username is \n 123 ${responseData}`} </text>
                <Grid/>
                <Button 
                    onClick={() => getUserProfile(_token)}
                    variant="contained"
                    color="primary"
                    size="medium"
                > Check profile stuff thing in logs
                </Button>
            </div>)}
        </div>
    )
}