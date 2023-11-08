import AddTimer from "./components/AddTimer.tsx";
import Header from "./components/Header.tsx";
import TimerList from "./components/Timer-list.tsx";
import { TimersCtxProvider } from "./store/Timers-ctx.tsx";

function App() {
  return (
    <TimersCtxProvider>
      <Header />
      <main>
        <AddTimer />
        <TimerList />
      </main>
    </TimersCtxProvider>
  );
}

export default App;
