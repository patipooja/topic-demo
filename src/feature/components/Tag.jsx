import Chip from "@mui/material/Chip";
import Stars from "@mui/icons-material/Stars";

const Tag = ({ data, onClick }) => {
  return (
    <Chip
      color="primary"
      label={`${data.stargazerCount} | ${data.name}`}
      onClick={onClick}
      icon={<Stars />}
      variant="outlined"
    />
  );
};

export default Tag;
