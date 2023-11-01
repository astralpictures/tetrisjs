import {useState} from 'react';
import {Button, Box, Container, SimpleGrid} from '@chakra-ui/react';
import {useGame} from '../game';
import Board from "./Board";

const
    Game = () => {
        const
            [active, setActive] = useState(false),
            [grid, keydown, level] = useGame(active);

        return (
            <Container maxW="960px">
                {(grid && active) &&
                    <SimpleGrid columns={2}>
                        <Board grid={grid} keydown={keydown} />
                    </SimpleGrid>}
                {!active &&
                    <Box 
                        display="flex"
                        alignItems="center" 
                        justifyContent="center"
                        height="100vh">
                        <Button
                            width="200px"
                            colorScheme="messenger"
                            onClick={() => {
                                setActive(true);
                            }}>
                            Start Game
                        </Button>
                    </Box>}
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