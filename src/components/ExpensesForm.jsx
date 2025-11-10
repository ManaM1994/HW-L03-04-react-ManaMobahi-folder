import { useState } from "react";
import Title from "./Title";
import { expeseActions } from "../redux/slices/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseTable from "./ExpenseTable";

const ExpensesForm = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  // Form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  // Filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("all");

  let filteredExpenses = expenses;

  if (filteredCategory && filteredCategory !== "all") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === filteredCategory
    );
  }
  if (startDate) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      if (!expense.date) return false;
      return new Date(expense.date) >= new Date(startDate);
    });
  }
  if (endDate) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      if (!expense.date) return false;
      return new Date(expense.date) <= new Date(endDate);
    });
  }

  const searchResult = filteredExpenses?.filter((expense) => {
    return (
      expense.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      expense.amount.toString().includes(searchItem)
    );
  });

  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now(),
      title,
      date,
      amount: parseFloat(amount),
      category,
    };
    dispatch(expeseActions.addExpense(newExpense));
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  const handleDeleteExpense = (id) => {
    dispatch(expeseActions.removeExpense(id));
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearchItem("");
    setFilteredCategory("all");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Title text="Enter your expenses" />

      <ExpenseForm
        title={title}
        setTitle={setTitle}
        amount={amount}
        setAmount={setAmount}
        date={date}
        setDate={setDate}
        category={category}
        setCategory={setCategory}
        onSubmit={handleAddExpense}
      />

      <ExpenseFilters
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
        onClearFilters={handleClearFilters}
      />

      <ExpenseTable expenses={searchResult} onDelete={handleDeleteExpense} />
    </div>
  );
};

export default ExpensesForm;
