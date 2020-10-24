import React, {Component} from 'react'
import StackGrid, {transitions} from 'react-stack-grid'
import sizeMe from 'react-sizeme'

const {scaleDown} = transitions

export const Grid = () =>{
    return(
        <StackGrid
            columnWidth={150}
            appear={scaleDown.appear}
            appeared={scaleDown.appeared}
            enter={scaleDown.enter}
            entered={scaleDown.entered}
            leaved={scaleDown.leaved}
        >
            <div key="key1">Item 1</div>
            <div key="key2">Item 2</div>
            <div key="key3">Item 3</div>
        </StackGrid>
    )
}