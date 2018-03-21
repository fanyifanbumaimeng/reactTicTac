import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/*class Square extends React.Component {
    constructor (){
        super()

    }
    render() {
        return (
            <button className="square" onClick={()=>this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}*/

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    constructor(){
        super()
        this.state = {
            squares:Array(9).fill(null),
            XIsNext:true,
            endGame:false,
            winner:null
        }
    }
    handleClick(index){

        if(this.state.endGame){
            return;
        }
        if(this.state.winner||this.state.squares[index]){
            return;
        }
        let square = this.state.squares.map((v,i)=>{
            if(i ===index){
                v = this.state.XIsNext?"X":"O"
            }
            return v;
        })
        let winner = calculateWinner(square)


        this.setState({
            squares:square,
            XIsNext:!this.state.XIsNext,
            winner:winner,
            endGame:winner?true:false
        })

      /* let squares = this.state.squares;
       squares[i] = "X";
       this.set*/
    }
    renderSquare(v,i) {
        return <Square key={i} value={this.state.squares[v]}
                       onClick={()=>this.handleClick(v)}
        />;
    }

    render() {

        let status;
        if(this.state.winner){
            status = 'Winner is '+ this.state.winner;
        }else{
            status = 'Next player:'+(this.state.XIsNext?"X":"O");
        }


        return (
            <div className="board">
                <div className="status">{status}</div>
                <button className="restart" onClick={()=>{this.setState({
                    squares:Array(9).fill(null),
                    winner:null,
                    XIsNext:true,
                    endGame:false
                })}}>restart</button>
                <div className="square-container">
                    {[0,1,2,3,4,5,6,7,8].map((v,i)=>this.renderSquare(v,i))}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
