import {Container, Grid} from "@chakra-ui/react";
import {board, pieces} from "../game";
import Cell from "./Cell";

const
    Board = ({grid}) => (
        <Container maxW={`${board.cell_width * board.cols}px`}>
            <Grid 
                gap={0} 
                templateRows={`repeat(${board.rows}, 1fr)`}
                templateColumns={`repeat(${board.cols}, 1fr)`}>
                {grid.map((row, x) => (
                    row.map((col, y) => (
                        <Cell
                            key={x + '|' + y}
                            row={x} 
                            col={y}
                            color={col > 0 ? pieces[col - 1].color : 'transparent'} />))))}
            </Grid>
        </Container>);

export default Board;