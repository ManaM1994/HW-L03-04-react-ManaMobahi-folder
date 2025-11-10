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
      const updated = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(updated));
      return updated;
    },
  },
});

export const expeseActions = ExpenseSlice.actions;
