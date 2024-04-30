import React, { useEffect, useReducer, useRef, useState } from "react";
import "../App.css";
import { initialState, reducerAction } from "../Helper/Datereducer";
import { Timer, setTime } from "../Helper/Timer";
function Homepage() {
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth().toString().length == 2
        ? new Date().getMonth() + 1
        : `0${new Date().getMonth() + 1}`
    }-${
      new Date().getDate().toString().length == 2
        ? new Date().getDate()
        : `0${new Date().getDate()}`
    }`
  );
  const [start, setStart] = useState(false);
  const timer = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [state, dispatch] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [input, setInput] = useState("");
  useEffect(() => {
    timer.current = setInterval(() => {
      if (
        start &&
        (state.days > 0 ||
          state.hours > 0 ||
          state.minutes > 0 ||
          state.seconds > 0)
      ) {
        dispatch((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (start) {
        setStart(false);
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [start]);
  useEffect(() => {
    Timer(state, dispatch, start, setStart, setSuccess);
  }, [state.seconds]);
  useEffect(() => {
    setTime(input, dispatch, state, setError);
  }, [input]);
  return (
    <div className="mainContainer">
      <h1>
        Countdown <span>Timer</span>
      </h1>
      <input
        type="datetime-local"
        name=""
        id=""
        min={`${date} 00:00`}
        value={input}
        onChange={(e) => {
          setSuccess("");
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (input) {
            setStart((prev) => !prev);
          } else {
            alert("Please select date");
          }
        }}
      >
        {!start ? "Start Timer" : "Cancel Timer"}
      </button>
      {!error && !success ? (
        <div className="count">
          <button>
            <p>{state.days}</p>
            <p>Days</p>
          </button>
          <button>
            <p>{state.hours}</p>
            <p>Hours</p>
          </button>
          <button>
            <p>{state.minutes}</p>
            <p>Minutes</p>
          </button>
          <button>
            <p>{state.seconds}</p>
            <p>Seconds</p>
          </button>
        </div>
      ) : (
        <p>{success}</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Homepage;
