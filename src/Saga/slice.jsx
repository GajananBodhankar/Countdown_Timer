import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "Idle",
};

const Slice = createSlice({
  name: "SagaSlice",
  initialState,
  reducers: {
    pending: (state) => {
      state.status = "Loading";
      state.data = [];
    },
    success: (state, action) => {
      state.data = action.payload;
      state.status = "Successful";
    },
    failure: (state) => {
      state.status = "Failed";
    },
  },
});

export const SliceReducer = Slice.reducer;

export const { pending, success, failure } = Slice.actions;
