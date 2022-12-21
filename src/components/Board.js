import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@chakra-ui/react";
import {board} from "../game";
import Cell from "./Cell";
const
    Board = ({matrix, piece, currentX, currentY}) => {
        const 
            [grid, setBoard] = useState(matrix);

        useEffect(() => {
            piece.forEach((row, y) => {
                row.forEach((value, x) => {
                  // this.x, this.y gives the left upper position of the shape
                  // x, y gives the position of the block in the shape
                  // this.x + x is then the position of the block on the board
                  if (value > 0) {
                    // this.ctx.fillRect(currentX + x, currentY);
                    grid
                  }
                });
              });
        });

        return (
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
                                color={col} />))))}
                </Grid>
            </Container>);
    };

export default Board;