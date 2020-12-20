import React from 'react'
import StackGrid from 'react-stack-grid'
import {makeStyles} from '@material-ui/core'
import {MoodCard} from '../card/MoodCard'

// redesign grid to use hexagons / diamonds?
// on hover, border glow
// use darker colour scheme 

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
        height: '30%',
    }
})

export const Grid = () => {

    const styles = useStyles(); 

    let happyQuery = ["Happy", "feel good", "happiness", "celebration"];
    let sadQuery = ["Sad", "crying", "melancholy", "sorrow"];
    let peaceQuery = ["Peaceful", "peace", "quiet", "calming", "piano"];
    let hypeQuery = ["Motivated", "hype", "high energy", "pumped up"];
    let btsQuery = ["BTS", "map of the soul"];
    let kpopQuery = ["Kpop", "top 20 kpop", "kpop for the soul"];
    let lofiQuery = ["Lofi", "lofi", "lofi hip hop", "lofi beats"];
    let animeQuery = ["Tokyo", "anime", "anime ost", "jpop"];
    let angryQuery = ["Angry", "upset", "Angry breakup", "mad"];
    let tiredQuery = ["Tired", "Exhausted", "so tired"];

    return(
        <div className={styles.base}>
            <StackGrid
                columnWidth="25%"
                gutterWidth={20}
                gutterHeight={10}
                className={styles.grid}
            >
                <div key="key1" className={styles.item}><MoodCard mood={happyQuery} /></div>
                <div key="key2" className={styles.item}><MoodCard mood={sadQuery}/></div>
                <div key="key3" className={styles.item}><MoodCard mood={peaceQuery}/></div>
                <div key="key4" className={styles.item}><MoodCard mood={hypeQuery}/></div>
            </StackGrid>
            <StackGrid
                columnWidth="25%"
                gutterWidth={25}
                gutterHeight={10}
                className={styles.grid}
            >
                <div key="key1"><MoodCard mood={btsQuery} /></div>
                <div key="key2"><MoodCard mood={lofiQuery} /></div>
                <div key="key3"><MoodCard mood={kpopQuery} /></div>
                <div key="key4"><MoodCard mood={angryQuery} /></div>
            </StackGrid>
            {/* <StackGrid
                columnWidth="25%"
                gutterWidth={25}
                gutterHeight={10}
                className={styles.grid}
            >
                <div key="key1"><MoodCard mood={tiredQuery} /></div>
                <div key="key2"><MoodCard mood={lofiQuery} /></div>
                <div key="key3"><MoodCard mood={kpopQuery} /></div>
                <div key="key4"><MoodCard mood={animeQuery} /></div>
            </StackGrid> */}
        </div>

    )
}