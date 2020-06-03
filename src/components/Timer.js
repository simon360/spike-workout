import React, { useEffect, useMemo, useState } from "react";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

export default function Timer({ length, key, onDone }) {
  const [completesAt, setCompletesAt] = useState(
    new Date().getTime() + length * 1000
  );
  const [timeLeft, setTimeLeft] = useState(length * 1000);
  const timeLeftSeconds = useMemo(() => Math.floor(timeLeft / 1000), [
    timeLeft,
  ]);
  const timeLeftDisplay = useMemo(() => formatTime(timeLeftSeconds), [
    timeLeftSeconds,
  ]);

  const [state, setState] = useState("running");

  useEffect(() => {
    // When key - ie. the set name - changes, reset the timer.
    setTimeLeft(length * 1000);
  }, [length, key]);

  useEffect(() => {
    if (state === "running") {
      setCompletesAt(new Date().getTime() + timeLeft);
    }
  }, [timeLeft, state]);

  useEffect(() => {
    if (state === "paused") return;

    const interval = setInterval(() => {
      const newTimeLeft = completesAt - new Date().getTime();

      if (newTimeLeft < 0) {
        setTimeLeft(0);
        onDone();
        clearInterval(interval);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [length, onDone, completesAt, state]);

  return (
    <>
      <h3>{timeLeftDisplay}</h3>
      <div>
        {state === "running" && (
          <button onClick={() => setState("paused")}>Pause</button>
        )}
        {state === "paused" && (
          <button onClick={() => setState("running")}>Resume</button>
        )}
        <button onClick={() => onDone()}>Skip to next</button>
      </div>
    </>
  );
}
