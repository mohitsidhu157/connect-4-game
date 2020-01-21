import React from 'react';
import classes from './style.module.css';
const singleBox = (props) => {
    let bgcolor = null;
    if(props.currentValues[props.rowid][props.colid] === 1 ){
        bgcolor = classes.red;
    }
    else if(props.currentValues[props.rowid][props.colid] === 2){
        bgcolor = classes.blue;
    }
    return (
        <div className={classes.block} onClick={()=>props.clicked(props.rowid,props.colid)}>
            <div className={`${classes.circle} ${bgcolor}`}></div>
        </div>
    )
}
export default singleBox;