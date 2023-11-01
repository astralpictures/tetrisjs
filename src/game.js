import {useEffect, useRef, useState} from 'react';

const
    board = {
        cols: 10,
        rows: 20,
        cell_width: 30
    },

    gameSettings = {
        base_duration: 5000,
        rate: 10
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
            gameSettings.base_duration - (gameSettings.rate * level - gameSettings.rate) <= 20 ?
                20 :
                gameSettings.base_duration - (gameSettings.rate * level - gameSettings.rate)),

    updateBoard = (grid, piece, coords) => {
        let tempGrid = [...grid];
console.log(coords, tempGrid);
        if (piece.shape) {
            for (let x = piece.shape.length - 1; x >= 0; x -= 1) {
                if (coords.x + x < board.rows) {
                    for (let y = 0; y < piece.shape[x].length; y += 1) {
                        tempGrid[coords.x + x][coords.y + y] = piece.shape[x][y];                  

                        if (coords.x > 0 && coords.movement === 'down') {
                            tempGrid[coords.x - 1][coords.y + y] = 0;
                        }
                    }

                    if (coords.movement === 'left') {
                        tempGrid[coords.x + x][coords.y + piece.shape[x].length] = 0;
                    } else if (coords.movement === 'right') {
                        tempGrid[coords.x + x][coords.y - 1] = 0;
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
            [coords, setCoords] = useState({x: 0, y: 0, movement: null}),
            [grid, setBoard] = useState(generateBoard()),
            [valid, setValid] = useState(false),
            [level, setLevel] = useState(1),
            keydown = (e) => {
                e.preventDefault();
                switch (e.key) {
                    case 'ArrowRight':
                        movePiece(0, 1, piece, 'right');
                        break;
                    case 'ArrowLeft':
                        movePiece(0, -1, piece, 'left');
                        break;
                    case 'ArrowDown':
                        movePiece(1, 0, piece, 'down');
                        break;
                    default:
                        break;
                }
            },
            tick = () => (movePiece(1, 0, piece, 'down')),
            checkMove = (movement, tempX, tempY) => {
                let 
                    valid = true,
                    pieceBottom = null;

                if (piece.shape) {
                    pieceBottom = piece.shape.length - 1;

                    if (movement === 'down') {
                        for (let y = 0; y < piece.shape[pieceBottom].length; y++) {
                            if (
                                piece.shape[pieceBottom][y] > 0 &&
                                    (tempX + pieceBottom >= board.rows ||  
                                    grid[tempX + pieceBottom][tempY + y]) > 0) {
                                return false;
                            }
                        }
                    } else if (movement === 'left') {
                        for (let x = 0; x < piece.shape.length; x++) {
                            if (
                                tempX < 0 ||
                                grid[tempX + x][tempY] > 0 ||
                                tempY < 0) {
                                return false;
                            }
                        }
                    } else if (movement === 'right') {
                        for (let x = 0; x < piece.shape.length; x++) {
                            if (
                                tempX < 0 ||
                                grid[tempX + x][tempY + piece.shape[x].length - 1] > 0 ||
                                tempY + piece.shape[x].length > board.cols) {
                                return false;
                            }
                        }
                    }
                }

                return valid;
            },
            movePiece = (x, y, piece, movement) => {
                console.log(piece, active, coords);
                if (piece.shape && active) {
                    // if (coords.y < 0) {
                    //     setCoords({x: coords.x, y: piece.shape.start_y});
                    // }
                    
                    let
                        tempX = x > 0 ? coords.x + x : coords.x,
                        tempY = y === 0 ? coords.y : coords.y + y,
                        tempValid = checkMove(movement, tempX, tempY);

                    setValid(tempValid);
                    
                    if (tempValid) {
                        setCoords({
                            x: tempX, 
                            y: tempY, 
                            movement: movement
                        });
                    } else if (movement === 'down') {
                        setPiece(pieces[generatePiece()]);
                    }
                }
            },
            makeMove = () => {
                if (valid) {
                    setBoard(updateBoard(grid, piece, coords));
                }
            };
        
        useInterval(tick, setDuration(level), active);

        useEffect(() => {
            if (active) {
                setPiece(pieces[generatePiece()]);
            }
        }, [active]);

        useEffect(makeMove, [coords.x, coords.y]);

        useEffect(() => {
            if (piece.shape) {
                setCoords({x: -1, y: piece.start_y});
            }
        }, [piece.shape]);

        return [grid, keydown, level];
    },

    useInterval = (callback, delay, active) => {
        const callbackRef = useRef();

        useEffect(() => {
            callbackRef.current = callback;
        }, [callback]);

        useEffect(() => {
            if (active) {
                const interval = setInterval(() => callbackRef.current(), delay);
                return () => clearInterval(interval);
            }
        }, [delay, active]);

    };

    // function rotateShape() {

    //     const tX = Math.floor(shape.width / 2);
    //     const tY = Math.floor(shape.height / 2);

    //     const newPoints = shape.shape.map( point => {
    //         let {x,y} = point;

    //         x -= tX;
    //         y -= tY;

    //         // cos 90 = 0, sin 90 = 1
    //         // x = x cos 90 - y sin 90 = -y
    //         // y = x sin 90 + y cos 90 = x
    //         let rX = -y;
    //         let rY = x;

    //         rX += tX;
    //         rY += tY;

    //         return {x: rX, y: rY};
    //     });
    //     const newShape = {
    //         shape: newPoints,
    //         width: shape.width,
    //         height: shape.height
    //     };

    //     if (validPosition(position, newShape)) {
    //         setShape(newShape);
    //     }
    // }

export {
    board,
    pieces,
    generateBoard,
    generatePiece,
    useGame
};
