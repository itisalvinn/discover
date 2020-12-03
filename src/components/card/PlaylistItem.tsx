import React from 'react'
import {Button} from '@material-ui/core'

export const PlaylistItem = ({data} : {data: any}) => {

    return (
        // want to display album art, song title, artist -- data.art, data.title, data.artist, data.previewUrl
        <div>
            <text> playlist item happy card {data.id} + {data.name} </text>
        </div>
    )
}