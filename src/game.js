import {useEffect, useRef, useState} from 'react';

const
    board = {
        cols: 10,
        rows: 20,
        cell_width: 30
    },

    gameSettings = {
        base_duration: 200,
        rate: 100
    },

    // pieces = [
    //     {
    //         color: 'cyan',
    //         shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
    //     },
    //     {
    //         color: 'blue',
    //         shape:  [[2, 0, 0], [2, 2, 2], [0, 0, 0]]
    //     },
    //     {
    //         color: 'orange',
    //         shape: [[0, 0, 3], [3, 3, 3], [0, 0, 0]]
    //     },
    //     {
    //         color: 'yellow',
    //         shape: [[4, 4], [4, 4]]
    //     },
    //     {
    //         color: 'green',
    //         shape: [[0, 5, 5], [5, 5, 0], [0, 0, 0]]
    //     },
    //     {
    //         color: 'purple',
    //         shape: [[0, 6, 0], [6, 6, 6], [0, 0, 0]]
    //     },
    //     {
    //         color: 'red',
    //         shape: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
    //     }
    // ],

    pieces = [
        {
            color: 'cyan',
            shape: [[1, 1, 1, 1]],
            start_y: 3
        },
        {
            color: 'blue',
            shape:  [[2, 0, 0], [2, 2, 2]],
            start_y: 4
        },
        {
            color: 'orange',
            shape: [[0, 0, 3], [3, 3, 3]],
            start_y: 4
        },
        {
            color: 'yellow',
            shape: [[4, 4], [4, 4]],
            start_y: 4
        },
        {
            color: 'green',
            shape: [[0, 5, 5], [5, 5, 0]],
            start_y: 4
        },
        {
            color: 'purple',
            shape: [[0, 6, 0], [6, 6, 6]],
            start_y: 4
        },
        {
            color: 'red',
            shape: [[7, 7, 0], [0, 7, 7]],
            start_y: 4
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
        let 
            tempGrid = [...grid];

        if (piece.shape) {
            for (let x = piece.shape.length - 1; x >= 0; x -= 1) {
                if (coords.x + x < board.rows) {
                    for (let y = 0; y < piece.shape[x].length; y += 1) {
                        if (tempGrid[coords.x + x][coords.y + y] === 0 && x === piece.shape.length - 1) {
                            tempGrid[coords.x + x][coords.y + y] = piece.shape[x][y];
                        } else if (x !== piece.shape.length - 1) {
                            tempGrid[coords.x + x][coords.y + y] = piece.shape[x][y];
                        }

                        if (coords.x > 0) {
                            tempGrid[coords.x - 1][coords.y + y] = 0;
                        }
                    }
                }
            }
            
            return tempGrid;
        }

        return grid;
    },
    
    useGame = (active) => {
        const
            [piece, setPiece] = useState({shape: null, color: null}),
            [coords, setCoords] = useState({x: -1, y:-1}),
            [grid, setBoard] = useState(generateBoard()),
            [level, setLevel] = useState(1),
            keydown = () => (null),
            tick = () => (movePiece(1, 0, piece)),
            checkMove = () => {
                let 
                    valid = true,
                    pieceBottom = null;

                if (piece.shape) {
                    pieceBottom = piece.shape.length - 1;

                    for (let i = 0; i < piece.shape[pieceBottom].length; i++) {
                        if (
                            piece.shape[pieceBottom][i] > 0 &&
                                (coords.x + pieceBottom >= board.rows ||  
                                grid[coords.x + pieceBottom][coords.y + i]) > 0) {
                            return false;
                        }
                    }
                }

                return valid;
            },
            makeMove = () => {
                if (checkMove() && coords.x < board.rows) {
                    setBoard(updateBoard(grid, piece, coords));
                } else {
                    setPiece(pieces[generatePiece()]);
                }
            },
            movePiece = (x, y, piece) => {
                if (piece.shape && active) {
                    let tempCoords = {...coords};
                    // console.log(tempCoords);
                    setCoords({x: tempCoords.x + x, y: tempCoords.y + y});
                }
            };
        
        useInterval(tick, setDuration(level));

        useEffect(() => {
            if (active) {
                setPiece(pieces[generatePiece()]);
            }
        }, [active]);

        useEffect(makeMove, [coords.x, coords.y]);

        useEffect(() => {
            if (piece.shape) {
                setCoords({x: 0, y: piece.start_y});
            }
        }, [piece.shape]);

        return [piece, grid, keydown, level];
    },

    useInterval = (callback, delay) => {
        const callbackRef = useRef();

        useEffect(() => {
            callbackRef.current = callback;
        }, [callback]);

        useEffect(() => {
            const interval = setInterval(() => callbackRef.current(), delay);
            return () => clearInterval(interval);
        }, [delay]);

    };

export {
    board,
    pieces,
    generateBoard,
    generatePiece,
    useGame
};
