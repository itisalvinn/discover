import React, {useState} from 'react'
import StackGrid, {transitions} from 'react-stack-grid'
import {makeStyles, Button} from '@material-ui/core'
import {PlaylistCard} from '../card/playlistCard'
import sizeMe from 'react-sizeme'

const useStyles = makeStyles ({
    base : {
        margin: '10px 10px',
    },
    item : {
        margin: '10 10',
    }
})

// can create const items array and map them to a title/img then display them in div card
// maybe use material ui card for each item thing

export const Grid = () =>{

    const [responseData, setResponseData] = useState('');
    const styles = useStyles(); 

    // remove later -- test method to get base spotify profile info
    const getUserProfile = (token: any) => {
        fetch('https://api.spotify.com/v1/me',{
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        })
        .then(resp => resp.json())
            .then((data) =>{
                setResponseData(data.display_name);
                console.log(token);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const access_token = localStorage.getItem('access_token');

    return(
        <div className={styles.base}>
            <StackGrid
                columnWidth="25%"
                gutterWidth={10}
                gutterHeight={10}
            >
                {/* Happy, Sad, Motivated, Mellow, Peace */}
                <div key="key1" className={styles.item}>Happy {responseData} <PlaylistCard/></div>
                <div key="key2" className={styles.item}>Sad <PlaylistCard/></div>
                <div key="key3" className={styles.item}>Motivated <PlaylistCard/></div>
                <div key="key4" className={styles.item}>Peaceful <PlaylistCard/></div>
            </StackGrid>
            <StackGrid
                columnWidth="25%"
                gutterWidth={10}
                gutterHeight={10}
            >
                <div key="key1">Item 1 <PlaylistCard/></div>
                <div key="key2">Item 2 <PlaylistCard/></div>
                <div key="key3">Item 3 <PlaylistCard/></div>
                <div key="key4">Item 4 <PlaylistCard/></div>
            </StackGrid>
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