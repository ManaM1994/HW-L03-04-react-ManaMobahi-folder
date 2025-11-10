import { useState } from "react";
import Title from "./Title";
import MainInput from "./MainInput";
import MainButton from "./MainButton";
import { incomeActions } from "../redux/slices/IncomeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const IncomeForm = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.incomes);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddIncome = () => {
    const newIncome = {
      id: Date.now(),
      date,
      amount: parseFloat(amount),
    };
    dispatch(incomeActions.addIncome(newIncome));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Title text="Enter your income" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MainInput type="date" label="" value={date} onChange={setDate} />
        <MainInput
          label="Amount"
          type="number"
          value={amount}
          onChange={setAmount}
        />
      </div>
      <div className="mb-8">
        <MainButton label="Add Income" onClick={handleAddIncome} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {incomes.map((income) => (
              <tr key={income.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {income.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ${income.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <MainButton
                    label="Delete"
                    color="error"
                    size="small"
                    onClick={() =>
                      dispatch(incomeActions.deleteIncome(income.id))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeForm;
