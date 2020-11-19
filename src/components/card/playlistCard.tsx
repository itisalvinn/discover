import React, {useState} from 'react'
import {Card, Button} from '@material-ui/core'

export const PlaylistCard = () => {
    const [responseData, setResponseData] = useState('');

    // test profile method
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

    // get track given mood
    const getTrack = () => {

    }

    const access_token = localStorage.getItem('access_token')

    return (
        <Card>
            test {responseData}
        </Card>
    )
}