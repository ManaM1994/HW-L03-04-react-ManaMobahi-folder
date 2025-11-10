import { createSlice } from "@reduxjs/toolkit";

const initialIncome = JSON.parse(localStorage.getItem("incomes")) || [];

export const IncomeSlice = createSlice({
  name: "incomes",
  initialState: initialIncome,
  reducers: {
    addIncome(state, action) {
      state.push(action.payload);
      localStorage.setItem("incomes", JSON.stringify(state));
    },
    deleteIncome(state, action) {
      const updatedList = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("incomes", JSON.stringify(updatedList));
      return updatedList;
    },
  },
});

export const incomeActions = IncomeSlice.actions;
