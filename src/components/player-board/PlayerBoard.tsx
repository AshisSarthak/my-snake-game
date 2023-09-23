import React, { useContext } from "react";
import ScoreTable from "../score-table/ScoreTable";
import { SnakeGameContext } from "../../context/game-context";

const PlayerBoard = () => {
  const { state } = useContext(SnakeGameContext);
  const { currentUserName } = state;
  const columns = [
    {
      title: "Your Top Scores",
      key: "score",
    },
  ];
  const userScores = JSON.parse(localStorage.getItem("userScores") as any);
  const myScores = userScores?.filter(
    (score: any) => score.name === currentUserName
  );
  myScores?.sort((myScoreA: any, myScoreB: any) =>
    myScoreA.score < myScoreB.score ? 1 : -1
  );
  const rows = myScores?.slice(0, 5);
  return (
    <ScoreTable
      columns={columns}
      rows={rows}
      header={`Hello ${currentUserName}`}
    />
  );
};

export default PlayerBoard;
