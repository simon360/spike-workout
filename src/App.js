import NoSleep from "nosleep.js";
import React, { useState, useEffect } from "react";

import "./App.css";
import Program from "./components/Program";
import Workout from "./components/Workout";

import workout1 from "./workout.json";
import workout2 from "./workout2.json";

function App() {
  const [appState, setAppState] = useState("ready");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [circuitIndex, setCircuitIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);

  const [audioObj, setAudioObj] = useState(null);
  const [noSleep, setNoSleep] = useState(null);

  useEffect(() => {
    // These are in an effect, so they only run client-side
    setAudioObj(new Audio("/beep.mp3"));
    setNoSleep(new NoSleep());
  }, []);

  const circuit = selectedWorkout && selectedWorkout[circuitIndex];
  const set = circuit && circuit.program[setIndex];

  const onDone = () => {
    audioObj.play();

    if (setIndex + 1 < circuit.program.length) {
      setSetIndex(setIndex + 1);
    } else if (circuitIndex + 1 < selectedWorkout.length) {
      setSetIndex(0);
      setCircuitIndex(circuitIndex + 1);
    } else {
      setAppState("done");
      setSetIndex(0);
      setCircuitIndex(0);
      noSleep.disable();
    }
  };

  return (
    <div className="App">
      {appState === "ready" && (
        <>
          <h1>Select a workout</h1>
          <button
            onClick={() => {
              setSelectedWorkout(workout1);
              setAppState("selected");
            }}
          >
            Workout 1 (May 26)
          </button>
          <button
            onClick={() => {
              setSelectedWorkout(workout2);
              setAppState("selected");
            }}
          >
            Workout 2 (June 2)
          </button>
        </>
      )}
      {appState === "selected" && (
        <>
          <button
            onClick={() => {
              setAppState("running");

              // Attempt to keep the screen on.
              noSleep.enable();

              // Attempt to play the ding. iOS won't play it unless the first play
              // was through a user initiated event.
              audioObj.play();
            }}
          >
            Start workout
          </button>
          <Program workout={selectedWorkout} />
        </>
      )}
      {appState === "running" && (
        <Workout circuitName={circuit.name} {...set} onDone={onDone} />
      )}
      {appState === "done" && <h1>You're finished - awesome work!</h1>}
    </div>
  );
}

export default App;
