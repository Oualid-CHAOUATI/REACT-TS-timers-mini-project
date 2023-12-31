import { useEffect, useRef, useState } from "react";
import { TTimer, useTimersContext } from "../store/Timers-ctx.tsx";
import Container from "./UI/Container.tsx";

const TIMER_INTEVAL = 50;
export default function TimerList({ name, duration }: TTimer) {
  //duration en s ==> convertir en ms
  const [remainingTime, setRemainingTimer] = useState(duration * 1000);
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const { isRunning } = useTimersContext();

  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

  if (isRunning && start == null) setStart(Date.now());

  const interval = useRef<number | null>(null);

  useEffect(() => {
    function clear() {
      if (interval.current) clearInterval(interval.current);
    }

    if (!isRunning) return clear();
    // ! ###if (remainingTime <= 0)  if (end === null) setEnd(Date.now());return clear(); .. ( I adde dthe dependency because of this)

    interval.current = setInterval(() => {
      setRemainingTimer((t) => {
        const newRemaining = t - TIMER_INTEVAL;
        //!-------------------------------------------------------------
        if (newRemaining <= 0 && end === null) setEnd(Date.now()); //! decie when to set end
        //!-------------------------------------------------------------

        return newRemaining > 0 ? newRemaining : 0;
      });
    }, TIMER_INTEVAL);

    // console.log(interval.current);

    return clear;
  }, [isRunning, end, remainingTime]);
  // }, [isRunning, end,remainingTime]); //!#### this code will push the useEffect whenever the remaining time updates ..; wich means too often .. therefore the timr will be slow and would take more then what its should !  you can try it
  return (
    <Container as="article">
      <p>Start : {start}</p>
      <p>end : {end}</p>
      <p>
        end - start :{" "}
        {end != null && start != null
          ? ((end - start) / 1000).toFixed(2)
          : "not-yet"}
      </p>
      <h2>{name}</h2>
      <p>duration : {duration}</p>
      <p>remaining : {formattedRemainingTime}</p>
      <progress max={duration * 1000} value={remainingTime} />
    </Container>
  );
}
