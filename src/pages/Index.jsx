import { useState } from "react";
import { Box, Button, Container, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderIcon = (value) => {
    if (value === "X") return <FaTimes color="red" />;
    if (value === "O") return <FaRegCircle color="blue" />;
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" mb={4}>
          Tic-Tac-Toe Game
        </Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {board.map((cell, index) => (
            <GridItem w="40px" h="40px" key={index} onClick={() => handleClick(index)}>
              <Button w="100%" h="100%" p={0}>
                {renderIcon(cell)}
              </Button>
            </GridItem>
          ))}
        </Grid>
        <Text fontSize="xl" mt={4}>
          {winner ? `Winner: ${winner}` : board.every((cell) => cell !== null) ? "Game is a draw" : `Next Player: ${xIsNext ? "X" : "O"}`}
        </Text>
        <Button colorScheme="blue" mt={4} onClick={resetGame}>
          Restart Game
        </Button>
      </VStack>
    </Container>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Index;
