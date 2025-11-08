import PieChartWithCustomizedLabel from "../components/PieChart";
import ExpenseLineChart from "../components/ExpenseLineChart";
import { useSelector } from "react-redux";

const Report = () => {
  const incomes = useSelector((state) => state.incomes);
  const expenses = useSelector((state) => state.expenses);

  const totalIncome = incomes.reduce(
    (total, income) => total + parseFloat(income.amount),
    0
  );
  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Financial Report
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Total Income
            </h3>
            <p className="text-3xl font-bold text-blue-600">${totalIncome}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold text-red-800 mb-4">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold text-red-600">${totalExpenses}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Expenses by Category
          </h3>
          <div className="min-h-[300px] w-full">
            <PieChartWithCustomizedLabel />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Income vs Expenses Timeline
          </h3>
          <div className="min-h-[300px] w-full">
            <ExpenseLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
