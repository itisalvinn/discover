import React, {useState} from 'react'
import StackGrid, {transitions} from 'react-stack-grid'
import {makeStyles, Button} from '@material-ui/core'
import {PlaylistCard} from '../card/playlistCard'
import axios from 'axios';
import sizeMe from 'react-sizeme'

const useStyles = makeStyles ({
    base : {
        margin: '10px 10px',
    },
    grid : {
        marginTop: '20px',
        marginBottom: '20px',
    },
    item : {
        margin: '10 10',
        color: '#FFFFF',
    }
})

// can create const items array and map them to a title/img then display them in div card
// maybe use material ui card for each item thing

export const Grid = () =>{

    const [responseData, setResponseData] = useState('');
    const styles = useStyles(); 

    // remove later -- test method to get base spotify profile info
    const getUserProfile = (token: any) => {
        axios({
            url: 'https://api.spotify.com/v1/me',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.data)
            .then((data) =>{
                setResponseData(data.display_name);
                console.log(data.display_name);
        });
    }

    const access_token = localStorage.getItem('access_token');

    return(
        <div className={styles.base}>
            <StackGrid
                columnWidth="25%"
                gutterWidth={25}
                gutterHeight={10}
                className={styles.grid}
            >
                {/* Happy, Sad, Motivated, Mellow, Peace -- display card on click, maybe include some animations */}
                <div key="key1" className={styles.item}><PlaylistCard/></div>
                <div key="key2" className={styles.item}><PlaylistCard/></div>
                <div key="key3" className={styles.item}><PlaylistCard/></div>
                <div key="key4" className={styles.item}><PlaylistCard/></div>
            </StackGrid>
            {/* <StackGrid
                columnWidth="25%"
                gutterWidth={25}
                gutterHeight={10}
                className={styles.grid}
            >
                <div key="key1"><PlaylistCard/></div>
                <div key="key2"><PlaylistCard/></div>
                <div key="key3"><PlaylistCard/></div>
                <div key="key4"><PlaylistCard/></div>
            </StackGrid> */}
            <Button 
                    onClick={() => getUserProfile(access_token)}
                    variant="contained"
                    color="primary"
                    size="medium"
                > Check profile stuff thing in logs
            </Button>
        </div>

    )
}