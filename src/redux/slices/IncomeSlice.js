import { createSlice } from "@reduxjs/toolkit";

const initialIncome = JSON.parse(localStorage.getItem("incomes")) || [];

export const IncomeSlice = createSlice({
  name: "incomes",
  initialState: initialIncome,
  reducers: {
    addIncome(state, action) {
      state.push(action.payload);
    },
    deleteIncome(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const incomeActions = IncomeSlice.actions;
