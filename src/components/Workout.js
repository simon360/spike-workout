import React from "react";

import "./Workout.css";
import Timer from "./Timer";

export default function Workout({
  circuitName,
  name,
  instructions,
  length,
  onDone,
}) {
  return (
    <div className="Workout">
      <strong>{circuitName}</strong>
      <h2>{name}</h2>
      {instructions && <p>{instructions}</p>}
      <Timer length={length} key={name} onDone={onDone} />
    </div>
  );
}
