import { useTimersContext } from "../store/Timers-ctx";
import TimerList from "./Timer";

export default function Timers() {
  const timers = useTimersContext().timers;

  return (
    <>
      <ul>
        {timers.map((timer, index) => (
          <li key={index}>
            <TimerList {...timer} />
          </li>
        ))}
      </ul>
    </>
  );
}
