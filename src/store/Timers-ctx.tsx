import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

export type TTimer = {
  name: string;
  duration: number;
};

type TTimersState = {
  isRunning: boolean;
  timers: Array<TTimer>;
};
const INITIAL_STATE: TTimersState = {
  isRunning: false,
  timers: [],
};

type TTimersContextValue = TTimersState & {
  addTimer: (t: TTimer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersCtx = createContext<TTimersContextValue | null>(null);

type TTimersCtxProviderValue = PropsWithChildren<{}>;

type TAction =
  | {
      type: "STOP_TIMERS" | "START_TIMERS";
    }
  | { type: "ADD_TIMER"; payload: TTimer };
//or could create a type  fro each action

const reducer = (state: TTimersState, action: TAction): TTimersState => {
  if (action.type === "START_TIMERS")
    return {
      ...state,
      isRunning: true,
    };
  else if (action.type === "STOP_TIMERS") return { ...state, isRunning: false };
  else if (action.type === "ADD_TIMER")
    return {
      ...state,
      timers: [...state.timers, action.payload],
    };
  return state;
};

export const TimersCtxProvider = ({ children }: TTimersCtxProviderValue) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const ctx: TTimersContextValue = {
    isRunning: state.isRunning,
    timers: state.timers,
    addTimer(t: TTimer) {
      dispatch({ type: "ADD_TIMER", payload: t });
    },
    startTimers() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };

  return <TimersCtx.Provider value={ctx}>{children}</TimersCtx.Provider>;
};

export const useTimersContext = () => {
  const ctx = useContext(TimersCtx);
  if (ctx === null) throw new Error("TimersContext is null");

  return ctx;
};
