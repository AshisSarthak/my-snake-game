import { Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import PlayerBoard from "../player-board/PlayerBoard";
import Instructions from "./Instructions";
import LeaderBoard from "../leaderboard/LeaderBoard";
import SnakeBoard from "../board/SnakeBoard";
import Legends from "../legends/Legends";
import { SnakeGameContext } from "../../context/game-context";

const GameView = () => {
  const { state } = useContext(SnakeGameContext);
  const { currentDirection } = state;

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4} height="full">
      <GridItem colSpan={3} h="full">
        <PlayerBoard />
        <Instructions />
      </GridItem>
      <GridItem colSpan={6}>
        <SnakeBoard />
        <Legends direction={currentDirection} />
      </GridItem>
      <GridItem colStart={10} colSpan={3} h="full">
        <LeaderBoard />
      </GridItem>
    </Grid>
  );
};

export default GameView;
