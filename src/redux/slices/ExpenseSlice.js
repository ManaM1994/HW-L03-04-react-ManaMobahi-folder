import { createSlice } from "@reduxjs/toolkit";

const initialExpense = JSON.parse(localStorage.getItem("expenses")) || [];

export const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpense,
  reducers: {
    addExpense(state, action) {
      state.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state));
    },
    removeExpense(state, action) {
      state.filter((item) => item.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(state));
    },
  },
});

export const expeseActions = ExpenseSlice.actions;
