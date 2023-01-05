import {useEffect, useState} from 'react';

const
    board = {
        cols: 10,
        rows: 20,
        cell_width: 30
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
    
    useGame = (active) => {console.log(active);
        const
            [piece, setPiece] = useState({shape: null, color: null});

        useEffect(() => {
            if (active) {
                setPiece(pieces[generatePiece()]);
            }
        }, [active]);

        return [piece];
    };

export {
    board,
    pieces,
    generateBoard,
    generatePiece,
    useGame
};
