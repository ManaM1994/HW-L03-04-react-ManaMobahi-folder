import { configureStore } from "@reduxjs/toolkit";
import { ExpenseSlice } from "./slices/ExpenseSlice";
import { IncomeSlice } from "./slices/IncomeSlice";

export const store = configureStore({
  reducer: {
    expenses: ExpenseSlice.reducer,
    incomes: IncomeSlice.reducer,
  },
});
