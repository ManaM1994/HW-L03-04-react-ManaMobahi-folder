import { TextField } from "@mui/material";

const MainInput = ({ label, type = "text", value, onChange }) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="medium"
      className="mb-4"
    />
  );
};

export default MainInput;
