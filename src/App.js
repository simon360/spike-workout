import React, { useState } from "react";
import "./App.css";

import Program from "./components/Program";
import Workout from "./components/Workout";
import workout from "./workout.json";

function App() {
  const [appState, setAppState] = useState("ready");
  const [circuitIndex, setCircuitIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);

  const circuit = workout[circuitIndex];
  const set = circuit.program[setIndex];

  const onDone = () => {
    if (setIndex + 1 < circuit.program.length) {
      setSetIndex(setIndex + 1);
    } else if (circuitIndex + 1 < workout.length) {
      setSetIndex(0);
      setCircuitIndex(circuitIndex + 1);
    } else {
      setAppState("done");
      setSetIndex(0);
      setCircuitIndex(0);
    }
  };

  return (
    <div className="App">
      {appState === "ready" && (
        <>
          <button onClick={() => setAppState("running")}>Start workout</button>
          <Program workout={workout} />
        </>
      )}
      {appState === "running" && <Workout {...set} onDone={onDone} />}
      {appState === "done" && <h1>You're finished - awesome work!</h1>}
    </div>
  );
}

export default App;
