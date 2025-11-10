import { Button } from "@mui/material";

const MainButton = ({ label, onClick, color = "primary", size = "large" }) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={() => onClick()}
      size={size}
    >
      {label}
    </Button>
  );
};

export default MainButton;
