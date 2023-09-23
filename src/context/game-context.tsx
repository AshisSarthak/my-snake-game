import React, { createContext, useMemo, useReducer } from "react";
import { INITIAL_STATE, STATE_TYPE, reducer } from "./reducer";

type SnakeGameContextProps = {
  state: STATE_TYPE;
  dispatch?: any;
};

const SnakeGameContext = createContext<SnakeGameContextProps>({
  state: INITIAL_STATE,
});

SnakeGameContext.displayName = "GameContext";

function SnakeGameContextProvider(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const providerValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <SnakeGameContext.Provider value={providerValue}>
      {props.children}
    </SnakeGameContext.Provider>
  );
}

export { SnakeGameContext, SnakeGameContextProvider };
