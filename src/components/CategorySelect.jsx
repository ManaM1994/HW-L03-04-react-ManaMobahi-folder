import { useState } from "react";
import {
  TextField,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Grow,
  ClickAwayListener,
  Box,
  Button,
} from "@mui/material";

const defaultCategories = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const CategorySelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("customCategories");
    return savedCategories
      ? [...defaultCategories, ...JSON.parse(savedCategories)]
      : defaultCategories;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowCustomInput(false);
    setCustomCategory("");
  };

  const handleSelect = (category) => {
    if (category.value === "other") {
      setShowCustomInput(true);
    } else {
      onChange(category.value);
      handleClose();
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      const newCategory = {
        value: customCategory.toLowerCase().replace(/\s+/g, "-"),
        label: customCategory.trim(),
      };

      const savedCategories = JSON.parse(
        localStorage.getItem("customCategories") || "[]"
      );
      savedCategories.push(newCategory);
      localStorage.setItem("customCategories", JSON.stringify(savedCategories));

      setCategories([...defaultCategories, ...savedCategories]);
      onChange(newCategory.value);
      handleClose();
    }
  };

  const selectedCategory = categories.find((cat) => cat.value === value);

  return (
    <div className="relative">
      <TextField
        fullWidth
        value={selectedCategory?.label || ""}
        onClick={handleClick}
        label="Category"
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        style={{ width: anchorEl?.offsetWidth, zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  {showCustomInput ? (
                    <Box p={2}>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        label="Enter custom category"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="mb-2"
                      />
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={1}
                        className="mt-2"
                      >
                        <Button size="small" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleAddCustomCategory}
                          disabled={!customCategory.trim()}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <MenuList>
                      {categories.map((category) => (
                        <MenuItem
                          key={category.value}
                          onClick={() => handleSelect(category)}
                          selected={value === category.value}
                        >
                          {category.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  )}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CategorySelect;
