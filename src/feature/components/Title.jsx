import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ variant }) => ({
  variant: variant ? variant : "h6",
  component: "div",
  flexGrow: 1,
  noWrap: true,
  display: {
    xs: "none",
    sm: "block",
  },
}));

const Title = (props) => {
  return (
    <StyledTypography {...props}>
      {props.titlelabel} :{" "}
      {props.nodata ? props.nodata : props.title ? props.title : ""}
    </StyledTypography>
  );
};

export default Title;
