import {ChakraProvider} from "@chakra-ui/react";
import Game from "./components/Game";

const
    App = () => (
        <ChakraProvider>
            <Game />
        </ChakraProvider>);

export default App;