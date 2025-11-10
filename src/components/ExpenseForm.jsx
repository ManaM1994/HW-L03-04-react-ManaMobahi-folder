import MainInput from "./MainInput";
import MainButton from "./MainButton";
import CategorySelect from "./CategorySelect";

const ExpenseForm = ({
  title,
  setTitle,
  amount,
  setAmount,
  date,
  setDate,
  category,
  setCategory,
  onSubmit,
}) => {
  return (
    <>
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
        <MainButton label="Add Expense" onClick={onSubmit} />
      </div>
    </>
  );
};

export default ExpenseForm;
