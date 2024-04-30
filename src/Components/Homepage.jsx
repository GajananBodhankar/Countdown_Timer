import React, { useEffect, useReducer, useRef, useState } from "react";
import "../App.css";
import { Timer, handleStart, interval, setTime } from "../Helper/Timer";
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
    interval(timer, dispatch, start, setStart, state);
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
          handleStart(input, setStart, setInput, dispatch);
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
