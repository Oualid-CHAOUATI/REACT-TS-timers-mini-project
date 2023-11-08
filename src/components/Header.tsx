import { useTimersContext } from "../store/Timers-ctx.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  const ctx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={ctx.isRunning ? ctx.stopTimers : ctx.startTimers}>
        {ctx.isRunning ? "stop" : "start"} timers
      </Button>
    </header>
  );
}
