import { useState } from "react";
import Title from "./Title";
import MainInput from "./MainInput";
import MainButton from "./MainButton";
import CategorySelect from "./CategorySelect";
import { expeseActions } from "../redux/slices/ExpenseSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ExpensesForm = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now(),
      title,
      date,
      amount: parseFloat(amount),
      category,
    };
    dispatch(expeseActions.addExpense(newExpense));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Title text="Enter your expenses" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MainInput label="Title" value={title} onChange={setTitle} />
        <MainInput
          label="Amount"
          type="number"
          value={amount}
          onChange={setAmount}
          InputProps={{
            startAdornment: "$",
          }}
        />
        <MainInput
          type="date"
          label=""
          value={date}
          onChange={setDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CategorySelect value={category} onChange={setCategory} />
      </div>
      <div className="mb-8">
        <MainButton label="Add Expense" onClick={handleAddExpense} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${expense.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {" "}
                  <button
                    onClick={() => {
                      dispatch(expeseActions.removeExpense(expense.id));
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesForm;
