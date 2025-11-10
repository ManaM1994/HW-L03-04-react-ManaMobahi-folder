import { createSlice } from "@reduxjs/toolkit";

const initialExpense = JSON.parse(localStorage.getItem("expenses")) || [];

export const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpense,
  reducers: {
    addExpense(state, action) {
      state.push(action.payload);
    },
    removeExpense(state, action) {
      return state.filter((item) => item.id !== action.payload);
     
    },
  },
});

export const expeseActions = ExpenseSlice.actions;
