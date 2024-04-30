import React, { useEffect, useReducer, useRef, useState } from "react";
import "../App.css";
import { initialState, reducerAction } from "../Helper/Datereducer";
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
  const [state, dispatch] = useReducer(reducerAction, initialState);
  const [input, setInput] = useState("");
  useEffect(() => {}, []);
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
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          let val = new Date(input).getTime() - new Date().getTime();
          dispatch({
            type: "set",
            payload: {
              days: Math.floor(val / (1000 * 60 * 60 * 24)),
              hours: Math.floor((val / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((val / (1000 * 60)) % 60),
              seconds: Math.floor((val / 1000) % 60),
            },
          });
        }}
      >
        {!start ? "Start Timer" : "Cancel Timer"}
      </button>
      <div className="count">
        <button onClick={() => console.log(input)}>
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
    </div>
  );
}

export default Homepage;
