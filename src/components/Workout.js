import React from "react";

import "./Workout.css";
import Timer from "./Timer";

export default function Workout({ name, instructions, length, onDone }) {
  return (
    <div className="Workout">
      <h2>{name}</h2>
      <p>{instructions}</p>
      <h3>
        <Timer length={length} onDone={onDone} />
      </h3>
    </div>
  );
}
