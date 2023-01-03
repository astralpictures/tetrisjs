import {Box, GridItem} from "@chakra-ui/react";
import {board} from "../game";

const
    Cell = ({row, col, color}) => (
        <GridItem rowSpan={1} colSpan={1}>
            <Box 
                border="1px" 
                height={board.cell_width}
                bg={color} />
        </GridItem>);

export default Cell;