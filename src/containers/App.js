import React, { Component } from 'react';
import  myclasses from './App.module.css';
import Row from '../components/Board/Row';

class App extends Component {
    state = {
        currentValues : [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
        ],
        turn : 0,
        winner : -1,
        player1Name : null,
        player2Name : null
    } 
    updateName1 = (event) =>{
        const newValue = event.target.value;
        this.setState({player1Name:newValue})
        
    }
    updateName2 = (event) => {
        const newValue = event.target.value;
        this.setState({player2Name:newValue})
        
    }
    buttonClickHandler= () => {
        this.setState({turn : 1})

    }
    checkVertically = (col,row) => {
        console.log("Row = " + row + " Col = "+ col);
         if(row>2){return;}
        else{
            let arr = [...this.state.currentValues];
            if((arr[row][col] === arr[row+1][col]) && (arr[row+1][col] === arr[row+2][col]) && (arr[row+2][col] === arr[row+3][col]) && arr[row][col]!== 0){
                console.log("Winner found");
                const current  = this.state.turn;
                this.setState({winner : current}, ()=>{console.log("Winner changed")})
            }
        }    
    }
    checkHorizontally = (col,row ) =>{
        let arr = [...this.state.currentValues];
        if(col<3){
            if(arr[row][col] === arr[row][col+1] && arr[row][col+1] === arr[row][col+2] && arr[row][col+2] === arr[row][col+3] && arr[row][col] !== 0  ){
                const current  = this.state.turn;
                this.setState({winner : current}, ()=>{console.log("Winner changed")})
            }
        }
        else if(col>3){
            if(arr[row][col] === arr[row][col-1] && arr[row][col-1] === arr[row][col-2] && arr[row][col-2] === arr[row][col-3] && arr[row][col] !== 0  ){
                const current  = this.state.turn;
                this.setState({winner : current}, ()=>{console.log("Winner changed")})
            }
        }
        else{
            if((arr[row][col] === arr[row][col-1] && arr[row][col-1] === arr[row][col-2] && arr[row][col-2] === arr[row][col-3] && arr[row][col] !== 0  ) ||
                (arr[row][col] === arr[row][col+1] && arr[row][col+1] === arr[row][col+2] && arr[row][col+2] === arr[row][col+3] && arr[row][col] !== 0 ) ){
                const current  = this.state.turn;
                this.setState({winner : current}, ()=>{console.log("Winner changed")})
            }
        }
    }
    checkDiagonally = (col,row ) => {
        let arr = [...this.state.currentValues];
        if(col<4){
            if(row>2){
                if((arr[row][col] === arr[row-1][col+1] && arr[row-1][col+1] === arr[row-2][col+2] && arr[row-2][col+2] === arr[row-3][col+3] && arr[row][col] !== 0  )){
                    const current  = this.state.turn;
                    this.setState({winner : current}, ()=>{console.log("Winner changed")});
                }
            }
            else if(row<=2){
                if((arr[row][col] === arr[row+1][col-1] && arr[row+1][col-1] === arr[row+2][col-2] && arr[row+2][col-2] === arr[row+3][col-3] && arr[row][col] !== 0  )){
                    const current  = this.state.turn;
                    this.setState({winner : current}, ()=>{console.log("Winner changed")});
                }
            }
        }
    }
    clickHandler = ( row,col ) => {
        if((this.state.winner !== -1)){
            return;
        }
        console.log("Button clicked"+row+col);
        let nextTurn = null;
        let arr = [...this.state.currentValues];
        let rowSet = null;
        for(let i = 5;i>=0;i--){
           if(arr[i][col] === 0){
               arr[i][col] = this.state.turn;
               rowSet = i;
               break;
           }
       }
       if(this.state.turn === 1){
           nextTurn = 2;
       }
       else if(this.state.turn === 2){
            nextTurn = 1;
        }
        this.setState({currentValues : arr,turn : nextTurn},()=>{
            this.checkVertically(col,rowSet) || this.checkHorizontally(col,rowSet) || this.checkDiagonally(col,rowSet) ;
        });
        
    }
    render() {
        let players_turn = null; 
        if(this.state.turn === 1){
            players_turn = this.state.player1Name;
        }
        else if(this.state.turn === 2){
            players_turn = this.state.player2Name;
        }
        let inputClass = null;
        let boardClass=null;
        if(this.state.turn !== 0 ){
            inputClass= myclasses.hide;
            boardClass = myclasses.show;
        }
        else{
            inputClass= myclasses.show;
            boardClass = myclasses.hide;
        }
        let board=[];
        for(let i=0;i<6;i++){
            board.push(<Row 
                            rowid={i} 
                            key={i} 
                            currentValues={this.state.currentValues}
                            clicked={this.clickHandler}
                        />)
        }
        return (        
            <div className={myclasses.App}>
               <h1>Connect 4 Game</h1>
               <div className={inputClass}>
                    <h3>Player's names</h3>
                    <h2>Player's 1 name : <input type="text" onChange={this.updateName1}/>
                    <input type="submit"/>
                    </h2>
                
                    <h2>Player's 2 name : <input type="text" onChange={this.updateName2}/>
                    <input type="submit"/></h2>
                    <button onClick={this.buttonClickHandler}>Start game</button>
               </div>
                <div className={boardClass}>
                    <h3>{players_turn}</h3>
                    {board}
                </div>
                

            </div>
            
        );
        //return React.createElement("div", {className : "App"},React.createElement("h1" , null , "I am JSX!!"));
    }
}
export default App;