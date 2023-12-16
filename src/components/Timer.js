import { useEffect } from "react";

function Timer({ dispatch, remainingSecs }) {
  const min = Math.floor(remainingSecs / 60);
  const sec = remainingSecs % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  if (remainingSecs === 0) {
    dispatch({ type: "finish" });
  }
  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:{sec < 10 ? "0" : ""}
      {sec}
    </div>
  );
}

export default Timer;
