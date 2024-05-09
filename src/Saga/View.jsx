import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pending } from "./slice";

function View() {
  const { data, status } = useSelector((state) => state.SliceReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data, status);
  }, [status]);
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
