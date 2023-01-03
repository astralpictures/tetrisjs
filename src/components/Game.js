import React, {useEffect, useState} from 'react';
import {Button, Container, SimpleGrid} from '@chakra-ui/react';
import {generateBoard, generatePiece, pieces} from '../game';
import Board from "./Board";

const
    matrix = generateBoard(),

    Game = () => {
        const 
            [coords, setCoords] = useState({x: 0, y: 0}),
            [piece, setPiece] = useState({shape: null, color: null}),
            [grid, setBoard] = useState(matrix);

        useEffect(() => {
            let tempGrid = grid;
            if (piece && piece.shape) {
                console.log(coords, piece.shape, tempGrid);
                piece.shape.forEach((row, x) => {
                    row.forEach((value, y) => {
                        tempGrid[coords.x + x][coords.y + y] = value;
                    });
                })
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
                    <Button
                        width="200px"
                        colorScheme="messenger"
                        onClick={() => {
                            setPiece(pieces[generatePiece()]);
                        }}>
                        Start Game
                    </Button>
                </SimpleGrid>
            </Container>);
    };

export default Game;