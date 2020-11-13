import React, {Component} from 'react'
import StackGrid, {transitions} from 'react-stack-grid'
import sizeMe from 'react-sizeme'

const {scaleDown} = transitions

// can create const items array and map them to a title/img then display them in div card

export const Grid = () =>{

    return(
        <div>
            <StackGrid
                columnWidth="20%"
            >
                <div key="key1">Item 1</div>
                <div key="key2">Item 2</div>
                <div key="key3">Item 3</div>
                <div key="key4">Item 4</div>
                <div key="key5">Item 5</div>
            </StackGrid>
            <StackGrid
                columnWidth="20%"
            >
                <div key="key1">Item 1</div>
                <div key="key2">Item 2</div>
                <div key="key3">Item 3</div>
                <div key="key4">Item 4</div>
                <div key="key5">Item 5</div>
            </StackGrid>
        </div>

    )
}