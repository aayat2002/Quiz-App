import React, { useEffect } from "react";
import { useState } from "react";

function Timer({ setTimeUp }) {
  const [second, setSeconds] = useState(10);

  useEffect(() => {
    if (second > 0) {
      const timerId = setTimeout(() => {
        setSeconds(second - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      setTimeUp(true);
    }
  }, [second]);

  useEffect(() => {
    setSeconds(15);
    setTimeUp(false);
  }, [setTimeUp]);
  return (
    <div className="timer">
      <h2>Time left: {second} second</h2>
    </div>
  );
}

export default Timer;
