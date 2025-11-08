import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function ExpenseLineChart() {
  const expenses = useSelector((state) => state.expenses);
  const incomes = useSelector((state) => state.incomes);

  const allDates = new Set([
    ...expenses.map((e) => e.date),
    ...incomes.map((i) => i.date),
  ]);

  const chartData = Array.from(allDates)
    .sort()
    .map((date) => {
      const dailyExpenses = expenses
        .filter((e) => e.date === date)
        .reduce((sum, e) => sum + e.amount, 0);

      const dailyIncomes = incomes
        .filter((i) => i.date === date)
        .reduce((sum, i) => sum + i.amount, 0);

      return {
        date,
        expenses: dailyExpenses,
        incomes: dailyIncomes,
      };
    });

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No transaction data available
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip
            formatter={(value) => [`$${value}`, undefined]}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#FF8042"
            name="Expenses"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="incomes"
            stroke="#0088FE"
            name="Income"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
