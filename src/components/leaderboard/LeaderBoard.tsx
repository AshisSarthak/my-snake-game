import React from "react";
import ScoreTable from "../score-table/ScoreTable";

const LeaderBoard = () => {
  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Score",
      key: "score",
    },
  ];
  const userScores = JSON.parse(localStorage.getItem("userScores") as any);
  userScores?.sort((myScoreA: any, myScoreB: any) =>
    myScoreA.score < myScoreB.score ? 1 : -1
  );
  const rows = userScores?.slice(0, 5);
  return (
    <ScoreTable columns={columns} rows={rows} header="LeaderBoard" addMedals />
  );
};

export default LeaderBoard;
