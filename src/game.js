import {useEffect, useState} from 'react';

const
    board = {
        cols: 10,
        rows: 20,
        cell_width: 30
    },

    gameSettings = {
        base_duration: 2000,
        rate: 100
    },

    pieces = [
        {
            color: 'cyan',
            shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
        },
        {
            color: 'blue',
            shape:  [[2, 0, 0], [2, 2, 2], [0, 0, 0]]
        },
        {
            color: 'orange',
            shape: [[0, 0, 3], [3, 3, 3], [0, 0, 0]]
        },
        {
            color: 'yellow',
            shape: [[4, 4], [4, 4]]
        },
        {
            color: 'green',
            shape: [[0, 5, 5], [5, 5, 0], [0, 0, 0]]
        },
        {
            color: 'purple',
            shape: [[0, 6, 0], [6, 6, 6], [0, 0, 0]]
        },
        {
            color: 'red',
            shape: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
        }
    ],

    generateBoard = () => (
        Array.from(
            {length: board.rows}, () => Array(board.cols).fill(0))),

    generatePiece = () => (Math.floor(Math.random() * pieces.length)),

    setDuration = (level) => (
        level === 1 ? 
            gameSettings.base_duration : 
            gameSettings.base_duration - gameSettings.rate * level <= 100 ?
                100 :
                gameSettings.base_duration - gameSettings.rate * level),

    updateBoard = (grid, piece, coords) => {
        let tempGrid = [...grid];

        if (piece.shape) {
            piece.shape.forEach((row, x) => {
                row.forEach((value, y) => {
                    tempGrid[coords.x + x][coords.y + y] = value;
                });
            });

            return tempGrid;
        }

        return grid;
    },
    
    useGame = (active) => {
        const
            [piece, setPiece] = useState({shape: null, color: null}),
            [coords, setCoords] = useState({x: 0, y: 0}),
            [grid, setBoard] = useState(generateBoard()),
            [level, setLevel] = useState(1),
            keydown = () => (null);

        useEffect(() => {
            if (active) {
                const interval = setInterval(() => {
                    console.log('This will be called every 2 seconds');
                }, setDuration(level));

                setPiece(pieces[generatePiece()]);

                return () => clearInterval(interval);
            }
        }, [active]);

        useEffect(() => (
            setBoard(updateBoard(grid, piece, coords))), 
            [coords.x, coords.y]);

        useEffect(() => {
            if (piece.shape && piece.shape.length === 2) {
                setCoords({x: 0, y: 4});
            } else if (piece.shape) {
                setCoords({x: 0, y: 3});
            }
        }, [piece.shape]);

        return [piece, grid, keydown, level];
    };

export {
    board,
    pieces,
    generateBoard,
    generatePiece,
    useGame
};
