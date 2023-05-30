import React, { useState, useEffect } from 'react';
import './App.css';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [startGame, setStartGame] = useState(true);
    const [gameHistory, setGameHistory] = useState([]);

    useEffect(() => {
        const storedGameHistory = JSON.parse(localStorage.getItem('gameHistory'));
        if (storedGameHistory) {
            setGameHistory(storedGameHistory);
        }
    }, []);

    const handleClick = (index) => {
        if (board[index] === '' && !winner) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            checkWinner(newBoard, currentPlayer);
            setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));

            if (newBoard.every((cell) => cell !== '') && !winner) {
                setWinner('draw');
                saveGameResult('draw');
            }
        }
    };

    const checkWinner = (board, player) => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] === player && board[b] === player && board[c] === player) {
                setWinner(player);
                saveGameResult(player);
                break;
            }
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setWinner(null);
    };

    const saveGameResult = (result) => {
        const timestamp = new Date().toLocaleString();
        const gameResult = { timestamp, result };
        setGameHistory((prevGameHistory) => [...prevGameHistory, gameResult]);
        localStorage.setItem(
            'gameHistory',
            JSON.stringify([...gameHistory, gameResult])
        );
    };

    const handleStartGame = () => {
        setStartGame(false);
    };

    const renderCell = (index) => {
        return (
            <div
                className={`cell ${board[index]}`}
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </div>
        );
    };

    return (
        <div className="app">
            {startGame ? (
                <div className="start-game" id="start-game">
                    <div className="wrap">
                        <button className="button-start" onClick={handleStartGame}>
                            Let's play!
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={"turn-text"}>{currentPlayer}'s turn </div>
                    <div className="game">
                        <div className="board">
                            {board.map((cell, index) => renderCell(index))}
                        </div>
                        <div className="game-history">
                            <h2>Game History</h2>
                            {gameHistory.length > 0 ? (
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Result</th>
                                        <th>Timestamp</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {gameHistory.map((game, index) => (
                                        <tr key={index}>
                                            <td>{game.result}</td>
                                            <td>{game.timestamp}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No game results yet.</p>
                            )}
                        </div>
                    </div>
                    {winner && (
                        <div className="winner">
                            <p>
                                {winner === 'draw' ? (
                                    <span>Draw!</span>
                                ) : (
                                    <span>Winner: {winner}</span>
                                )}
                            </p>
                            <div className="button-reset" onClick={resetGame}>
                                <a href="#" className="btn">
                                    Reset Game
                                </a>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TicTacToe;
