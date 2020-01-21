import React from 'react';
import SingleBox from './SingleBox';
import classes from './style.module.css';
const row = (props) => {
   const myrow=[];
    for(let j=0;j<7;j++){
        myrow.push(<SingleBox 
                        key={j} 
                        rowid={props.rowid} 
                        colid={j} 
                        currentValues={props.currentValues}
                        clicked={props.clicked}    
                    />)
    }
    return (
        <div className={classes.row}>
            
        {myrow}
        </div>
    );
}
export default row;