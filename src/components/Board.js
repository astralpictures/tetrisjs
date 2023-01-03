import {Container, Grid} from "@chakra-ui/react";
import {board} from "../game";
import Cell from "./Cell";

const
    Board = ({grid, piece}) => (
        <Container maxW={`${board.cell_width * board.cols}px`}>
            <Grid 
                gap={0} 
                templateRows={`repeat(${board.rows}, 1fr)`}
                templateColumns={`repeat(${board.cols}, 1fr)`}>
                {grid.map((row, x) => (
                    // console.log('x', x, row, grid),
                    row.map((col, y) => (
                        // console.log('y', y, col),
                        <Cell
                            key={x + '|' + y}
                            row={x} 
                            col={y}
                            color={(piece && piece.color && col > 0) ? piece.color : 'transparent'} />))))}
            </Grid>
        </Container>);

export default Board;