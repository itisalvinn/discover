import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles ({
    pageHeader : {
        display: 'flex',
        flexDirection: 'row',
        height: '50px',
    },
    pageTitle : {
        color: '#fff',
        margin: '0px 90px 10px',
        fontSize: '2.5em',
        width: '70%',
        zIndex: 10,
    },
    logo : {
        float: 'left',
        position: 'fixed',
        borderRadius: '30px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        textAlign: 'center',
        marginLeft: '35px',
        marginTop: '15px',
        width: '30px',
        height: '30px',
    },
    pageHeaderRight : {
        color: '#fff',
        float: 'right',
        marginTop: '15px',
        marginRight: '20px',
    }
})

export const GridHeader = () => {
    const styles = useStyles();

    return (
        <div className={styles.pageHeader}>
            {/* can either have div logo or just replace the entire logo + page title with img */}
            <div className={styles.logo}></div> 
            <h1 className={styles.pageTitle}>Mood</h1>
            {/* right side drop down -> clear cache / log out of spotify */}
            <div className={styles.pageHeaderRight}>
                page header right side
            </div>
        </div>
    )
}