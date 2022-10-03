import React, { Component } from 'react'
import Board from './Board'

const claculateWinner = squares => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            console.log("win")
            return squares[a]
        }
        return null
    }
}

class Game extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         history: [{ squares: Array(9).fill(null) }],
    //         stepNum: 0,
    //         xIsNext: true
    //     }
    // }

    state = {
        history: [{ squares: Array(9).fill(null) }],
        stepNum: 0,
        xIsNext: true
    }

    handleClick = i => {
        const history = this.state.history.slice(0, this.state.stepNum + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if (claculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{ squares }]),
            stepNum: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumTo = step => {   // step means index
        this.state({
            stepNum: step,
            xIsNext: step % 2 == 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNum]
        const winner = claculateWinner(current.squares)

        const moves = history.map((_, move) => {    // moves means index
            const desc = move ? 'Go to Move #' + move : 'Go to Game Start'
            return (
                <li key={move}>
                    <button className='btn' onClick={() => this.jumTo(move)}>{desc}</button>
                </li>
            )
        })

        let status = ''
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className='game' >
                <div className='game-board'>
                    <Board squares={current.squares} onClick={this.handleClick} />
                </div>
                <div className='game-info'>
                    <div>
                        <h2>{status}</h2>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game