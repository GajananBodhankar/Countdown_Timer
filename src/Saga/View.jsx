import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pending } from "./slice";

function View() {
  const { data, status } = useSelector((state) => state.SliceReducer);
  const [d, s] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data, status);
    dispatch(pending());
  }, []);

  return (
    <div>
      hello
      <button
        onClick={() => {
          dispatch(pending());
        }}
      >
        hello
      </button>
    </div>
  );
}

export default View;
