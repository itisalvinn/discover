import React, {Component} from 'react'
import StackGrid, {transitions} from 'react-stack-grid'
import {makeStyles} from '@material-ui/core'
import sizeMe from 'react-sizeme'

const useStyles = makeStyles ({

})

// can create const items array and map them to a title/img then display them in div card
// maybe use material ui card for each item thing

export const Grid = () =>{

    const styles = useStyles(); 

    return(
        <div>
            <StackGrid
                columnWidth="25%"
            >
                {/* Happy, Sad, Motivated, Mellow, Peace */}
                <div key="key1">Item 1</div>
                <div key="key2">Item 2</div>
                <div key="key3">Item 3</div>
                <div key="key4">Item 4</div>
            </StackGrid>
            <StackGrid
                columnWidth="25%"
            >
                <div key="key1">Item 1</div>
                <div key="key2">Item 2</div>
                <div key="key3">Item 3</div>
                <div key="key4">Item 4</div>
            </StackGrid>
        </div>

    )
}