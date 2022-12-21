import React, {useState} from 'react';
import {generateBoard} from '../game';
import Board from "./Board";

const
    matrix = generateBoard(),

    Game = () => {
        const 
            [coords, setCoords] = useState({x: 0, y: 0});

        return (
            <>
                <Board 
                    matrix={matrix}
                    currentX={coords.x}
                    currentY={coords.y} />
            </>);
    };

export default Game;