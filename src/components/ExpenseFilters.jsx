import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MainButton from "./MainButton";

const defaultCategories = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const ExpenseFilters = ({
  searchItem,
  setSearchItem,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filteredCategory,
  setFilteredCategory,
  onClearFilters,
}) => {
  let categories = defaultCategories;
  const savedCategories = localStorage.getItem("customCategories");
  const allCategories = savedCategories
    ? [...defaultCategories, ...JSON.parse(savedCategories)]
    : defaultCategories;
  categories = [{ value: "all", label: "All" }, ...allCategories];

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 shadow-sm">
      <div className="mb-6 relative">
        <TextField
          size="medium"
          fullWidth
          label="Search title or amount"
          variant="outlined"
          className="bg-white"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Filter by:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="From"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            className="bg-white"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="To"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            className="bg-white"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </div>

        <div className="w-full">
          <FormControl fullWidth className="bg-white rounded-lg">
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={filteredCategory}
              label="Category"
              onChange={(e) => setFilteredCategory(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <MainButton
          label="Clear Filters"
          onClick={onClearFilters}
          size="small"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700"
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
