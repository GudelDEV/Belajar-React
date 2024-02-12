/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Fragment, Component } from 'react';
import './index.css';

// Functions Calculate Winner
function calculateWinner(squares) {
  // membuat rules
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // melakukan pengulangan untuk rules
  for (let i = 0; i < rules.length; i++) {
    // mengambil nilai rules indeks ke i di isikan oleh 0 , 1 , 2
    // const a = rules[i][0]; // 0
    // const b = rules[i][1]; // 1
    // const c = rules[i][2]; // 2

    // atau menggunakan teknik destructuring agar kode lebih simple dan mudah dan simpel
    const [a, b, c] = rules[i];

    // mengecek isi apakah squares ada isinya dan nilai squares indeks ke a ke b , ke c sama dengan X ataupun O jika true maka menang jika salah satunya tidak sama maka lanjut
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c]) {
      return squares[a];
    }
  }
  // jika kondisi tidak memenuhi syarat return false
  return false;
}

class Square extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <button
          className="square"
          onClick={this.props.onSquareClick}
        >
          {this.props.value}
        </button>
      </Fragment>
    );
  }
}
class Board extends Component {
  constructor(props) {
    super(props);
  }
  handleClick(index) {
    // pengecekan Jika property squares memiliki nilai X atau nilai O maka program block statement ini tidak di jalankan
    if (this.props.history[index] === 'X' || this.props.history[index] === 'O' || calculateWinner(this.props.history)) {
      return;
    }

    const nextSquares = this.props.history.slice(); // [Null,Null,Null,Null,Null,Null,Null,Null,Null]

    // Pengkondisian untunk mendecek nilai properti xIsNext apakah ada isinya atau tidak menggunakan if else
    if (this.props.xIsNext === true) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }

    // Pengkondisian untunk mendecek nilai properti xIsNext apakah ada isinya atau tidak menggunakan operator terna
    // nextSquares[index] = this.props.xIsNext ? 'X' : 'O';

    // mengannti nilai properti squares dengan nilai variable nextsquares
    // this.setState({ squares: nextSquares });

    // Mengubah nilai properti xIsNext menjadi nilai boolean false
    // this.setState({ xIsNext: !this.state.xIsNext });

    this.props.onPlay(nextSquares);
  }

  status() {
    const winner = calculateWinner(this.props.history);
    let status = '';
    if (winner) {
      status = `Player : ${winner} wins!`;
    } else {
      status = `Next player : ${this.props.xIsNext ? 'X' : 'O'}`;
    }

    // console.log(winner);
    return status;
  }

  render() {
    return (
      <Fragment>
        <section
          className="
        winner"
        >
          {this.status()}
        </section>
        <section className="board">
          <Square
            value={this.props.history[0]}
            onSquareClick={() => {
              return this.handleClick(0);
            }}
          />
          <Square
            value={this.props.history[1]}
            onSquareClick={() => {
              return this.handleClick(1);
            }}
          />
          <Square
            value={this.props.history[2]}
            onSquareClick={() => {
              return this.handleClick(2);
            }}
          />
        </section>
        <section className="board">
          <Square
            value={this.props.history[3]}
            onSquareClick={() => {
              return this.handleClick(3);
            }}
          />
          <Square
            value={this.props.history[4]}
            onSquareClick={() => {
              return this.handleClick(4);
            }}
          />
          <Square
            value={this.props.history[5]}
            onSquareClick={() => {
              return this.handleClick(5);
            }}
          />
        </section>
        <section className="board">
          <Square
            value={this.props.history[6]}
            onSquareClick={() => {
              return this.handleClick(6);
            }}
          />
          <Square
            value={this.props.history[7]}
            onSquareClick={() => {
              return this.handleClick(7);
            }}
          />
          <Square
            value={this.props.history[8]}
            onSquareClick={() => {
              return this.handleClick(8);
            }}
          />
        </section>
      </Fragment>
    );
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      xIsNext: true,
      history: [Array(9).fill(null)],
      currentSquares: Array(9).fill(null),
      currentMove: 0,
    };
    // Mengikat metode handlePlay ke instance kelas Game
    this.handlePlay = this.handlePlay.bind(this);
  }
  jumpToMove = (nextmove) => {
    this.setState({
      currentMove: nextmove,
      xIsNext: this.state.currentMove % 2 === 0,
    });
  };

  handlePlay(squaresNext) {
    const nextHistory = [...this.state.history.slice(0, this.state.currentMove + 1), squaresNext];
    this.setState({
      history: nextHistory,
      currentMove: nextHistory.length - 1,
      xIsNext: !this.state.xIsNext,
    });
  }
  moves() {
    return this.state.history.map((squares, i) => {
      let description = '';
      if (i > 0) {
        description = `Go To Move ${i}`;
      } else {
        description = `Go To Game Start`;
      }
      return (
        <li key={i}>
          <button onClick={() => this.jumpToMove(i)}>{description}</button>
        </li>
      );
    });
  }

  // eslint-disable-next-line react/require-render-return
  render() {
    return (
      <Fragment>
        <h2>React Tic-Tac-Toe</h2>
        <section className="game">
          <section className="game-board">
            <Board
              xIsNext={this.state.xIsNext}
              history={this.state.history[this.state.currentMove]}
              onPlay={this.handlePlay}
            />
          </section>
          <section className="history">
            <ol>{this.moves()}</ol>
          </section>
        </section>
      </Fragment>
    );
  }
}

export default Game;
