import React, { useContext } from "react";
import "./App.css";
import { SnakeGameContext } from "../../context/game-context";
import Login from "../login/Login";
import GameView from "./GameView";

function App() {
  const { state } = useContext(SnakeGameContext);
  const { userLoggedIn } = state;

  return !userLoggedIn ? <Login /> : <GameView />;
}

export default App;
