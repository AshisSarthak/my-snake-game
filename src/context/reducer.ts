import { DIRECTION } from "../typings";

export const reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        userLoggedIn: true,
        currentUserName: action.payload,
      };
    }
    case "SET_DIRECTION": {
      return {
        ...state,
        currentDirection: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userLoggedIn: false,
        currentUserName: "",
      };
    }
    default:
      return state;
  }
};

export interface STATE_TYPE {
  userLoggedIn: boolean;
  currentUserName?: string;
  currentDirection: DIRECTION;
  boardX: number;
  boardY: number;
  initialDelay: number;
  scale: number;
  initialSnake: number[][];
  initialApple: number[];
}

export const INITIAL_STATE = {
  userLoggedIn: false,
  currentDirection: DIRECTION.right,
  boardX: 1000,
  boardY: 1000,
  initialDelay: 500,
  scale: 50,
  initialSnake: [
    [4, 10],
    [4, 10],
  ],
  initialApple: [8, 10],
};
