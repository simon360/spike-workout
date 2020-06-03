import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Complete() {
  const { width, height } = useWindowSize();

  return (
    <>
      <h1>You're finished - awesome work!</h1>
      <Confetti width={width} height={height} />
    </>
  );
}
