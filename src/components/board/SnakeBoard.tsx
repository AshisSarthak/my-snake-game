import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  useInterval,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SnakeGameContext } from "../../context/game-context";
import { DIRECTION } from "../../typings";
import "./SnakeBoard.css";

const getDirectionCoordinates = (directionVal: DIRECTION) => {
  if (directionVal === DIRECTION.left) {
    return [-1, 0];
  }
  if (directionVal === DIRECTION.up) {
    return [0, -1];
  }
  if (directionVal === DIRECTION.right) {
    return [1, 0];
  }
  return [0, 1];
};

const SnakeBoard = () => {
  const { state, dispatch } = useContext(SnakeGameContext);
  const {
    boardY,
    boardX,
    currentDirection,
    currentUserName,
    initialDelay,
    initialApple,
    initialSnake,
    scale,
  } = state;
  const boardRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [gameOver, setGameOver] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(
    getDirectionCoordinates(currentDirection)
  );
  const [delay, setDelay] = useState<number | null>(null);

  useInterval(() => runSnake(), delay);

  useEffect(() => {
    if (boardRef.current) {
      const board = boardRef.current;
      const context = board.getContext("2d");
      if (context) {
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.translate(0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = "red";
        context.fillRect(apple[0], apple[1], 1, 1);
      }
    }
  }, [apple, scale, snake]);

  const startGame = () => {
    if (!gameInProgress) {
      setSnake(initialSnake);
      setApple(initialApple);
      setDelay(initialDelay);
      setDirection(direction);
      setScore(0);
      setGameInProgress(!gameInProgress);
      setGameOver(false);
    } else {
      setDelay(null);
      setGameOver(true);
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  const checkBoundary = (snakeHeads: number[]) => {
    for (let i = 0; i < snake.length; i++) {
      if (snakeHeads[i] < 0 || snakeHeads[i] * scale >= boardX) {
        return true;
      }
    }

    for (const snakePos of snake) {
      if (snakeHeads[0] === snakePos[0] && snakeHeads[1] === snakePos[1]) {
        return true;
      }
    }
    return false;
  };

  const isSnakeEating = (newSnake: number[][]) => {
    const position = apple.map(() =>
      Math.floor((Math.random() * boardX) / scale)
    );
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      setScore(score + 1);
      setApple(position);
      return true;
    }
    return false;
  };

  const logScore = () => {
    const userScores =
      JSON.parse(localStorage.getItem("userScores") as string) || [];
    userScores?.push({
      id: userScores.length + 1,
      name: currentUserName,
      score: score,
    });
    localStorage.setItem("userScores", JSON.stringify(userScores));
  };
  const runSnake = () => {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkBoundary(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      setGameInProgress(!gameInProgress);
      dispatch({
        type: "SET_DIRECTION",
        payload: DIRECTION.right,
      });
      logScore();
    }
    if (!isSnakeEating(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const handleArrowKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        dispatch({
          type: "SET_DIRECTION",
          payload: DIRECTION.left,
        });
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        dispatch({
          type: "SET_DIRECTION",
          payload: DIRECTION.up,
        });
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        dispatch({
          type: "SET_DIRECTION",
          payload: DIRECTION.right,
        });
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        dispatch({
          type: "SET_DIRECTION",
          payload: DIRECTION.down,
        });
        setDirection([0, 1]);
        break;
    }
  };

  return (
    <Container
      height="500px"
      m="10px"
      onKeyDown={(e) => handleArrowKeyPress(e)}
      tabIndex={0}
    >
      <Heading size="lg" color={"darkcyan"}>
        <Flex>
          <Container width={"200px"}>
            <Button
              onClick={startGame}
              className="playButton"
              bg="darkcyan"
              disabled={gameOver}
            >
              {gameInProgress ? "Logout" : "Play"}
            </Button>
          </Container>
          <Container>
            <Flex justifyContent={"flex-end"}>
              <Center>Snake Game</Center>
            </Flex>
          </Container>
          <Container className="scoreBox" width={"300px"}>
            <h2>Score: {score}</h2>
          </Container>
        </Flex>
      </Heading>

      <Flex m="10px" width={"full"} height="full">
        <canvas
          className="playSection"
          ref={boardRef}
          width={`${boardX}px`}
          height={`${boardY}px`}
        />
      </Flex>
      {gameOver && <div className="gameOver">Game Over</div>}
    </Container>
  );
};

export default SnakeBoard;
