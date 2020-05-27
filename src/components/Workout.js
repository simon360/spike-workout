import React from "react";

import "./Workout.css";
import Timer from "./Timer";

export default function Workout({ name, instructions, length, onDone }) {
  return (
    <div className="Workout">
      <h2>{name}</h2>
      {instructions && <p>{instructions}</p>}
      <Timer length={length} key={name} onDone={onDone} />
    </div>
  );
}
