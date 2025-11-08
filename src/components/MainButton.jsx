import { Button } from "@mui/material";

const MainButton = ({ label, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => onClick()}
      size="large"
    >
      {label}
    </Button>
  );
};

export default MainButton;
