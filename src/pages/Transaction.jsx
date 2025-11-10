import ExpensesForm from "../components/ExpensesForm";
import IncomeForm from "../components/IncomeForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Transaction = () => {
  const expenses = useSelector((state) => state.expenses);
  const incomes = useSelector((state) => state.incomes);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [expenses, incomes]);
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Transaction Page
        </h2>
        <p className="text-gray-600 mb-8">Manage your transactions here.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ExpensesForm />
        <IncomeForm />
      </div>
    </div>
  );
};

export default Transaction;
