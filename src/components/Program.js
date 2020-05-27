import React from "react";

export default function Program({ workout }) {
  return (
    <>
      <h2>Full program</h2>
      <ul>
        {workout.map((circuit) => (
          <li key={circuit.name}>
            <span>{circuit.name}</span>
            <ul>
              {circuit.program.map((set) => (
                <li key={set.name}>
                  <strong>{set.name}</strong>
                  {set.instructions ? ` (${set.instructions})` : ""},{" "}
                  {set.length} seconds
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
