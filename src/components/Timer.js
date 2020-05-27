import { useEffect, useMemo, useState } from "react";

const formatTime = (seconds) => `:${String(seconds).padStart(2, "0")}`;

export default function Timer({ length, onDone }) {
  const [timeLeft, setTimeLeft] = useState(length * 1000);
  const timeLeftSeconds = useMemo(() => Math.floor(timeLeft / 1000), [
    timeLeft,
  ]);
  const timeLeftDisplay = useMemo(() => formatTime(timeLeftSeconds), [
    timeLeftSeconds,
  ]);

  useEffect(() => {
    const started = new Date().getTime();
    const completed = started + length * 1000;

    const interval = setInterval(() => {
      const newTimeLeft = completed - new Date().getTime();

      if (newTimeLeft < 0) {
        setTimeLeft(0);
        onDone();
        clearInterval(interval);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [length, onDone]);

  return timeLeftDisplay;
}
