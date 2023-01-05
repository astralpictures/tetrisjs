import {useEffect, useState} from 'react';
import {Button, Container, SimpleGrid} from '@chakra-ui/react';
import {generateBoard, useGame} from '../game';
import Board from "./Board";

const
    Game = () => {
        const 
            [coords, setCoords] = useState({x: 0, y: 0}),
            [grid, setBoard] = useState(generateBoard()),
            [active, setActive] = useState(false),
            [piece] = useGame(active);

        useEffect(() => {
            let tempGrid = [...grid];

            if (piece && piece.shape) {
                piece.shape.forEach((row, x) => {
                    row.forEach((value, y) => {
                        tempGrid[coords.x + x][coords.y + y] = value;
                    });
                });

                setBoard(tempGrid);
            }
        }, [coords.x, coords.y]);

        useEffect(() => {
            if (piece && piece.shape && piece.shape.length === 2) {
                setCoords({x: 0, y: 4});
            } else if (piece && piece.shape) {
                setCoords({x: 0, y: 3});
            }
        }, [piece.shape]);

        return (
            <Container maxW="960px">
                <SimpleGrid columns={2}>
                    <Board 
                        grid={grid}
                        piece={piece} />
                    {!active &&
                        <Button
                            width="200px"
                            colorScheme="messenger"
                            onClick={() => {
                                setActive(true);
                            }}>
                            Start Game
                        </Button>}
                </SimpleGrid>
            </Container>);
    };

export default Game;

// TODO:
// create an initGame function that calls functions to
// starts the timer, 
// creates pieces, 
// looks for collisions, 
// handles keyboard input, 
// handles clearing,
// handles game over 